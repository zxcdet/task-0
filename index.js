import {createServer} from 'node:http';
import {handlerApiRoute} from "./handler-api-route.js";
import {handlerServerError} from './handler-server-error.js';
import {handlerStaticFile} from './handler-static.js';

const server = createServer(async (req, res) => {
    try {
        if (req.url.startsWith('/api')) {
            await handlerApiRoute(req, res);
            return;
        }
        await handlerStaticFile(req, res);
    } catch (err) {
        handlerServerError(res,err);
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
