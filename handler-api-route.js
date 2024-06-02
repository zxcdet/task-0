import { readFile} from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import status from 'http-status';

import { MyError, handlerError } from "./handler-error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Route = {
    DATA_ROUTE:  '/api/data',
    SECOND_ROUTE: '/api/second-route',
    FIRST_FILE_ROUTE: '/api/open-file1',
    SECOND_FILE_ROUTE: '/api/open-file2',
};

export  async function handlerApiRoute(req, res) {
    switch (req.url) {
        case Route.DATA_ROUTE:
            res.end(JSON.stringify({name: 'data'}));
            break;
        case Route.SECOND_ROUTE:
            const resultSecond = await readFile(path.join(__dirname, 'static', 'pages', 'second.html'));
            res.end(resultSecond);
            break;
        case Route.FIRST_FILE_ROUTE:
            const resultTextFile = await readFile(path.join(__dirname, 'static', 'text', 'main.txt') , 'utf8');
            res.end(resultTextFile);
            break;
        case Route.SECOND_FILE_ROUTE:
            const resultJsonFile = await readFile(path.join(__dirname, 'static', 'json', 'data.json'), 'utf8');
            res.end(resultJsonFile);
            break;
        default:
             const err =  new MyError( status.NOT_FOUND, `Error 404: ${status['404_MESSAGE']}`);
             handlerError(res, err)
    }
}