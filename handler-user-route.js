import status from "http-status";

import {handlerError, MyError} from "./handler-error.js";

export  function handlerUserRoute (req, res) {
    const paramItem = req.url.split('/');
    const correctParam = paramItem[2];
    if (correctParam && !paramItem[3]) {
        res.end(correctParam);
    } else {
        const err =  new MyError( status.NOT_FOUND, `Error 404: ${status['404_MESSAGE']}`);
        handlerError(res, err);
    }

}