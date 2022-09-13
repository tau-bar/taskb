import express from 'express';
import { handleDeleteUrl } from '../controller/urlController.js';

const router = express.Router()

router.delete('/:code', handleDeleteUrl)

export default router;