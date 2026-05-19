import express from 'express';
import { ComplaintController } from './complaintController';
import { auth } from '../../../core/middlewares/auth';
import { requireTenant } from '../../../core/middlewares/tenant';

const router = express.Router();

router.use(auth()); // All complaint routes require auth
router.use(requireTenant); // All complaint routes require organization context

router.post('/', auth('complaint:create'), ComplaintController.create);
router.get('/', auth('complaint:view'), ComplaintController.list);
router.post('/assign', auth('complaint:assign'), ComplaintController.assign);

export default router;
