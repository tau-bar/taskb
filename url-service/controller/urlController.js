import { createUrl, deleteUrl, editUrl, getAll, getUrl } from '../domain/urlDomain.js';
import { OperationError, RequestError } from '../utils/errors.js';

export const handleGetUrl = async (req, res) => {
    try {
        const { code } = req.params;
        const url = await getUrl(code);
        if (url) {
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json(OperationError.URL_NOT_FOUND)
        }

    }
    catch (err) {
        res.status(400).json(err.toString())
    }
}

export const handleGetAllUrls = async (req, res) => {
    try {
        const result = await getAll();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).json(err.toString())
    }
}

export const handleEditUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        const { code } = req.params;

        if (!longUrl) {
            res.status(400).json(RequestError.LONG_URL_NOT_PROVIDED)
            return;
        }

        if (!code) {
            res.status(400).json(RequestError.URL_CODE_NOT_PROVIDED)
            return;
        }

        const result = await editUrl(longUrl, code);
        if (result) {
            const { message } = result;
            if (result.ok) {
                res.json(message);
                return;
            } else {
                res.status(404).json(message);
                return;
            }
            
        } else {
            res.status(404).json(OperationError.URL_NOT_FOUND)
            return;
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
                return;
            } else {
                res.status(404).json(message)
                return;
            }
            
        } else {
            res.json(OperationError.URL_NOT_DELETED)
            return;
        }
    }
    catch (err) {
        res.status(400).json(err.toString())
    }
}

export const handleCreateUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!longUrl) {
            res.status(400).json(RequestError.LONG_URL_NOT_PROVIDED)
            return;
        }
        const url = await createUrl(longUrl);

        if (url) {
            res.json(url);
            return;
        } else {
            res.json(OperationError.URL_NOT_CREATED)
            return;
        }
    } catch (err) {
        res.status(400).json(err.toString());
    }
}