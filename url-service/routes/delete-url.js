import express from 'express';
import Url from '../models/UrlModel.js'

const router = express.Router()

router.delete('/:code', async (req, res) => {
    try {
        const result = await Url.deleteOne({
            urlCode: req.params.code
        })
        if (result.deletedCount == 1) {
            return res.status(200).json("Successfully deleted shortened URL from database.")
        } else {
            return res.status(404).json('The shortened URL was not found.')
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).json("An error occurred on the server.")
    }
})

export default router;