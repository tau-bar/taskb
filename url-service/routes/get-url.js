import express from 'express'
import Url from '../models/UrlModel.js'

const router = express.Router()

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if (url) {
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json('The shortened URL was not found.')
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).json('An error occurred on the server.')
    }
})


export default router;