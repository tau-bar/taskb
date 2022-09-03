const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
const router = express.Router()
const Url = require('../models/UrlModel')

const baseUrl = 'localhost:8000/api/url'

router.put('/:code', async (req, res) => {
    const { longUrl } = req.body 

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('The baseUrl provided is invalid.')
    }

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.updateOne({
                urlCode: req.params.code
            },
            {
                longUrl: longUrl
            })

            if (url.matchedCount === 1 && url.modifiedCount === 1) {
                res.json("The longUrl has been edited.")
            } else if (url.matchedCount === 1 && url.modifiedCount === 0) {
                res.json("The longUrl provided is not different.")
            } else {
                res.json("Could not find the shortened URL provided.")
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

module.exports = router