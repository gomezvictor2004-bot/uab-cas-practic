import { Router } from 'express';
import statusRoutes from './statusRoutes.js';
import briefingRoutes from './briefingRoutes.js';
import documentRoutes from './documentRoutes.js';
import taskRoutes from './taskRoutes.js';

const router = Router();

router.use('/status', statusRoutes);
router.use('/briefings', briefingRoutes);
router.use('/documents', documentRoutes);
router.use('/tasks', taskRoutes);

export default router;
