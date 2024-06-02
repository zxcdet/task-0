import {createReadStream, existsSync} from "node:fs";
import { readFile} from 'node:fs/promises';
import path from "path";
import {fileURLToPath} from "url";

import mime from "mime-types";
import status from "http-status";

import {handlerError, MyError} from "./handler-error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handlerStaticFile(req, res) {
    if (req.url !== '/') {
        const staticPath = path.join(__dirname, 'static', req.url);

        if (existsSync(staticPath)) {
            res.setHeader('Content-type', mime.lookup(req.url));
            const staticFile = await  new Promise((resolve, reject) => {
                createReadStream(staticPath).on('data' , (chunk) => {
                    resolve(chunk);
                }).on('error' , (err) => {
                    reject(err);
                });
            });

            res.end(staticFile);
        } else {
            const err =  new MyError( status.NOT_FOUND, `Error 404: ${status['404_MESSAGE']}`);
            handlerError(res, err);
        }
    }
    const mainPageResult = await readFile(path.join(__dirname, 'static', 'pages', 'index.html'));
    res.end(mainPageResult);
}