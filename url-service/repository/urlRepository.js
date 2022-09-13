import Url from "../models/UrlModel.js";

export const getUrlByUrlCode = async (code) => {
    try {
        let url = await Url.findOne({ urlCode: code });
        return url;
    } catch (err) {
        console.error("ERROR: Failed to retrieve url.", err);
        throw err;
    }
}

export const addUrl = async (longUrl, urlCode) => {
    try {
        let url = await Url.findOne({ longUrl, urlCode })
        if (url) {
            return url;
        } else {
            const newUrl = new Url({ longUrl, urlCode, date: new Date() });
            await newUrl.save();
            return newUrl;
        }
    } catch (err) {
        console.error("ERROR: Failed to create url.", err);
    }
}

export const updateUrl = async (longUrl, urlCode) => {
    try {
        let url = await Url.updateOne({
            urlCode: urlCode
        },
        {
            longUrl: longUrl
        })

        return {
            "matchedCount": url.matchedCount,
            "modifiedCount": url.modifiedCount,
        }
    } catch (err) {
        console.error("ERROR: Failed to update url.", err);
    }
}

export const deleteUrlByUrlCode = async (code) => {
    try {
        const result = await Url.deleteOne({
            urlCode: code
        })
        return {
            "deletedCount": result.deletedCount,
        }
    } catch (err) {
        console.error("ERROR: Failed to delete url.", err);
    }
}
