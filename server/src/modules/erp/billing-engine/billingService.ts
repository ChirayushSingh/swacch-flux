import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class BillingService {
  /**
   * Automatically generates a monthly invoice for a contractor based on operational data.
   * Subtracts penalties for SLA breaches and missed routes.
   */
  static async generateMonthlyInvoice(contractId: string, month: number, year: number) {
    try {
      const contract = await prisma.contract.findUnique({
        where: { id: contractId },
        include: { contractor: true, tender: true }
      });

      if (!contract) throw new Error('Contract not found');

      // 1. Calculate Base Amount (based on tender value or route completion)
      // Mocked calculation: Fixed monthly base
      const baseAmount = contract.value / 12;

      // 2. Aggregate Penalties (SLA Breaches, missed routes from previous phases)
      const penalties = await prisma.penaltyLog.findMany({
        where: {
          orgId: contract.contractor.orgId,
          createdAt: {
            gte: new Date(year, month - 1, 1),
            lte: new Date(year, month, 0)
          }
        }
      });

      const totalPenalty = penalties.reduce((acc, curr) => acc + curr.amount, 0);

      // 3. Final Invoice Amount
      const finalAmount = Math.max(baseAmount - totalPenalty, 0);

      // 4. Create Invoice Record
      const invoice = await prisma.invoice.create({
        data: {
          orgId: contract.contractor.orgId,
          contractId,
          invoiceNo: `INV-${contract.contractor.name.substring(0, 3).toUpperCase()}-${year}${month}-${Math.floor(Math.random() * 1000)}`,
          month,
          year,
          amount: finalAmount,
          penaltyApplied: totalPenalty,
          status: 'PENDING'
        }
      });

      // 5. Initiate Approval Workflow
      await prisma.approvalRequest.create({
        data: {
          orgId: contract.contractor.orgId,
          invoiceId: invoice.id,
          type: 'INVOICE_APPROVAL',
          requestedById: 'SYSTEM',
          status: 'PENDING'
        }
      });

      logger.info(`Invoice ${invoice.invoiceNo} generated for ${contract.contractor.name}`);
      return invoice;
    } catch (error) {
      logger.error('Billing Engine Error:', error);
    }
  }
}
