import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { logger } from './config/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 5000;

// Socket.IO Logic
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('join_org', (orgId) => {
    socket.join(orgId);
    logger.info(`User ${socket.id} joined organization room: ${orgId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Export IO for use in services
export { io };

import { GpsSyncService } from './modules/fleet/gps-ingestion/gpsSyncService';

async function startServer() {
  try {
    await prisma.$connect();
    logger.info('Connected to PostgreSQL Database via Prisma');

    // Start Live GPS Telemetry Sync background task
    GpsSyncService.startSync();

    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
