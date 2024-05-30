import mime from "mime-types";
import {createReadStream} from "node:fs";
import { readFile} from 'node:fs/promises';
import path from "path";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handlerStaticFile(req, res) {
    if (req.url !== '/') {
        if (!mime.lookup(req.url)) {
            const erroFile = await readFile(path.join(__dirname, 'static', 'pages', 'error.html'));
            res.end(erroFile);
            return;
        }
        res.setHeader('Content-type', mime.lookup(req.url));
        const staticFile = await  new Promise((resolve, reject) => {
            createReadStream(path.join(__dirname, 'static', req.url)).on('data' , (chunk) => {
                resolve(chunk);
            }).on('error' , (err) => {
                reject(err);
            })
        });

        res.end(staticFile);
    }
    const mainPageResult = await readFile(path.join(__dirname, 'static', 'pages', 'index.html'));
    res.end(mainPageResult);
}