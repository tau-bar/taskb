import express from 'express'
import { handleGetUrl } from '../controller/urlController.js';

const router = express.Router()

router.get('/:code', handleGetUrl)

export default router;