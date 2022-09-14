export const RequestError = {
    LONG_URL_NOT_PROVIDED: "Invalid request body, longUrl not provided.",
    URL_CODE_NOT_PROVIDED: "Invalid request body, url code not provided.",
}

export const OperationError = {
    URL_NOT_CREATED: "Could not create url.",
    URL_NOT_DELETED : "Could not delete url from server.",
    URL_NOT_FOUND: "Could not find the shortened URL provided.",
}

export const ValidationError = {
    INVALID_LONG_URL: "The longUrl provided is invalid."
}

export const errorPrefix = "Error: "

export const RouteError = {
    INVALID_ENDPOINT: 'This endpoint does not exist.'
}