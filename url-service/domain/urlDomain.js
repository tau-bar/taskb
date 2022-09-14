import validUrl from 'valid-url';
import shortid from 'shortid';
import { addUrl, deleteUrlByUrlCode, getUrlByUrlCode, updateUrl } from '../repository/urlRepository.js';

export const createUrl = async (longUrl) => {
    if (!validUrl.isUri(longUrl)) {
        throw new Error("The longUrl provided is invalid.");
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
        throw new Error("The longUrl provided is invalid.");
    }

    const result = await updateUrl(longUrl, urlCode);
    if (result) {
        const { matchedCount, modifiedCount } = result;
        if (matchedCount === 1 && modifiedCount === 1) {
            return {
                "ok": true,
                "message": "The longUrl has been edited."
            }
        } else if (matchedCount === 1 && modifiedCount === 0) {
            return {
                "ok": true,
                "message": "The longUrl provided is not different."
            }
        } else {
            return {
                "ok": false,
                "message": "Could not find the url code provided."
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

export const deleteUrl = async (urlCode) => {
    const result = await deleteUrlByUrlCode(urlCode);
    if (result) {
        const { deletedCount } = result;
        if (deletedCount === 1) {
            return {
                "found": true,
                "message": "URL successfully deleted."
            }
        } else {
            return {
                "found": false,
                "message": "URL was not found."
            }
        }
    } else {
        return null;
    }
}