import express from 'express';
import validUrl from 'valid-url';
import shortid from 'shortid';
import Url from '../models/UrlModel.js'

const router = express.Router()


const baseUrl = 'localhost:8000/api/url'

router.post('/', async (req, res) => {
    const { longUrl } = req.body 

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('The baseUrl provided is invalid.')
    }

    const urlCode = shortid.generate()

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({longUrl})

            if (url) {
                res.json(url)
            } else {
                const shortUrl = `${baseUrl}/${urlCode}`

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json('An error occurred on the server.')
        }
    } else {
        res.status(401).json('The longUrl provided is invalid.')
    }
})

export default router;