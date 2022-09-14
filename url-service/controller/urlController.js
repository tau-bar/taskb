import { createUrl, deleteUrl, editUrl, getUrl } from '../domain/urlDomain.js';

export const handleGetUrl = async (req, res) => {
    try {
        const { code } = req.params;
        const url = await getUrl(code);
        if (url) {
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json('The shortened URL was not found.')
        }

    }
    catch (err) {
        console.error(err)
        res.status(400).json(err.toString())
    }
}

export const handleEditUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        const { code } = req.params;

        if (!longUrl) {
            res.status(400).json("Invalid request body, longUrl not provided.")
        }

        if (!code) {
            res.status(400).json("Invalid request body, url code not provided.")
        }

        const result = await editUrl(longUrl, code);
        if (result) {
            const { message } = result;
            if (result.ok) {
                res.json(message);
            } else {
                res.status(404).json(message);
            }
            
        } else {
            res.status(404).json("Could not find the shortened URL provided.")
        }
    } catch (err) {
        res.status(400).json(err.toString())
    }
}

export const handleDeleteUrl = async (req, res) => {
    try {
        const { code } = req.params;
        const result = await deleteUrl(code);
        if (result) {
            const { found, message } = result;
            if (found) {
                res.json(message)
            } else {
                res.status(404).json(message)
            }
            
        } else {
            res.json("Could not delete url from server.")
        }
    }
    catch (err) {
        console.error(err)
        res.status(400).json(err.toString())
    }
}

export const handleCreateUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!longUrl) {
            res.status(400).json("Invalid request body, longUrl not provided.")
        }
        const url = await createUrl(longUrl);

        if (url) {
            res.json(url);
        } else {
            res.json("Could not create url.")
        }
    } catch (err) {
        console.error(err);
        res.status(400).json(err.toString());
    }
}