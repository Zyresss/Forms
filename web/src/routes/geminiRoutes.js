import express from 'express';
import { getGeminiResponse } from '../controllers/geminiController.js';

const router = express.Router();

router.get('/', getGeminiResponse);

export default router;