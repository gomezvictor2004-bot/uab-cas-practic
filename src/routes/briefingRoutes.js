import { Router } from 'express';
import { getBriefing } from '../controllers/briefingController.js';

const router = Router();

router.get('/', getBriefing);

export default router;
