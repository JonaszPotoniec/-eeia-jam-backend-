const respondWithError = (res, statusCode, message) => {
    res.status(statusCode).json({"ERROR": message})
}
const respondWithJSON = (res, statusCode, json) => {
    res.status(statusCode).json(json);
}

export {respondWithError, respondWithJSON};