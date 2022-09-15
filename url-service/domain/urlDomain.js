import validUrl from 'valid-url';
import shortid from 'shortid';
import { addUrl, deleteUrlByUrlCode, getAllUrls, getUrlByUrlCode, updateUrl } from '../repository/urlRepository.js';
import { ValidationError } from '../utils/errors.js';
import { ResponseMessage } from '../utils/messages.js';

export const createUrl = async (longUrl) => {
    if (!validUrl.isUri(longUrl)) {
        throw new Error(ValidationError.INVALID_LONG_URL);
    }

    const urlCode = shortid.generate();
    const url = await addUrl(longUrl, urlCode);
    if (url) {
        return url;
    } else {
        return null;
    }
}

export const editUrl = async (longUrl, urlCode) => {
    if (!validUrl.isUri(longUrl)) {
        throw new Error(ValidationError.INVALID_LONG_URL);
    }

    const result = await updateUrl(longUrl, urlCode);
    if (result) {
        const { matchedCount, modifiedCount } = result;
        if (matchedCount === 1 && modifiedCount === 1) {
            return {
                "ok": true,
                "message": ResponseMessage.URL_EDIT_SUCCESS,
            }
        } else if (matchedCount === 1 && modifiedCount === 0) {
            return {
                "ok": true,
                "message": ResponseMessage.URL_NOT_DIFFERENT,
            }
        } else {
            return {
                "ok": false,
                "message": ResponseMessage.URL_NOT_FOUND,
            } 
        }
    } else {
        return null;
    }
}

export const getUrl = async (urlCode) => {
    const url = await getUrlByUrlCode(urlCode);
    if (url) {
        return url;
    } else {
        return null;
    }
}

export const getAll = async () => {
    const result = await getAllUrls();
    return result;
}

export const deleteUrl = async (urlCode) => {
    const result = await deleteUrlByUrlCode(urlCode);
    if (result) {
        const { deletedCount } = result;
        if (deletedCount === 1) {
            return {
                "found": true,
                "message": ResponseMessage.URL_DELETE_SUCCESS
            }
        } else {
            return {
                "found": false,
                "message": ResponseMessage.URL_NOT_FOUND
            }
        }
    } else {
        return null;
    }
}