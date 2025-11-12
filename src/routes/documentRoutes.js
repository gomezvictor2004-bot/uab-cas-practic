import { Router } from 'express';
import { summarize, list } from '../controllers/documentController.js';

const router = Router();

router.post('/summary', summarize);
router.get('/', list);

export default router;
