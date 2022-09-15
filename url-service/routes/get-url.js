import express from 'express'
import { handleGetAllUrls, handleGetUrl } from '../controller/urlController.js';

const router = express.Router()

router.get('/all', handleGetAllUrls)
router.get('/:code', handleGetUrl)

export default router;