import { PrismaClient } from '@prisma/client';
import { io } from '../../index';

const prisma = new PrismaClient();

export class NotificationService {
  static async sendNotification(userId: string, title: string, message: string, type: string) {
    // 1. Save to database
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
      }
    });

    // 2. Push real-time via Socket.IO
    // User room name is usually their userId
    io.to(userId).emit('notification', notification);

    // 3. Optional: SMS/Email logic placeholder
    console.log(`Sending SMS to user ${userId}: ${title} - ${message}`);

    return notification;
  }
}
