import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './core/middlewares/error';
import { ApiError } from './core/utils/ApiError';
import httpStatus from 'http-status';

const app: Express = express();

// Set security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable cors
app.use(cors());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

import authRoutes from './api/v1/auth/authRoutes';
import complaintRoutes from './api/v1/complaints/complaintRoutes';
import intelligenceRoutes from './api/v1/intelligence/intelligenceRoutes';
import dpiRoutes from './modules/dpi/dpiRoutes';
import autonomousRoutes from './modules/autonomous/autonomousRoutes';
import climateRoutes from './modules/climate/climateRoutes';
import circularRoutes from './modules/circular/circularRoutes';
import govtechRoutes from './modules/govtech/govtechRoutes';
import billingRoutes from './modules/billing/billingRoutes';
import wasteInfraRoutes from './modules/waste-infra/wasteInfraRoutes';
import productionRoutes from './modules/production/productionRoutes';
import cloudRoutes from './modules/cloud/cloudRoutes';
import demoRoutes from './modules/demo/demoRoutes';

// v1 api routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/complaints', complaintRoutes);
app.use('/api/v1/intelligence', intelligenceRoutes);
app.use('/api/v1/dpi', dpiRoutes);
app.use('/api/v1/autonomous', autonomousRoutes);
app.use('/api/v1/climate', climateRoutes);
app.use('/api/v1/circular', circularRoutes);
app.use('/api/v1/govtech', govtechRoutes);
app.use('/api/v1/billing', billingRoutes);
app.use('/api/v1/waste-infra', wasteInfraRoutes);
app.use('/api/v1/production', productionRoutes);
app.use('/api/v1/cloud', cloudRoutes);
app.use('/api/v1/demo', demoRoutes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});

// handle error
app.use(errorHandler);

export default app;
