import { Router } from 'express';
import { BillingController } from './billingController';

const router = Router();

router.get('/compliance', BillingController.getCompliance);
router.get('/invoices', BillingController.getInvoices);
router.get('/contractors', BillingController.getContractors);
router.get('/tamper-audits', BillingController.getTamperAudits);

export default router;
