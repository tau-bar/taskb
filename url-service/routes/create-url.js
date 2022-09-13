import express from 'express';
import { handleCreateUrl } from '../controller/urlController.js';

const router = express.Router()

router.post('/', handleCreateUrl)

export default router;