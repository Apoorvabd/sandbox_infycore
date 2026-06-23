import {Router} from 'express';
import syncTransactions from './ingestion.controller.js';

const router = Router();

router.post("/sync",syncTransactions);
export default router;