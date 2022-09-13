import express from 'express';
import { handleEditUrl } from '../controller/urlController.js';

const router = express.Router()

router.put('/:code', handleEditUrl);

export default router;