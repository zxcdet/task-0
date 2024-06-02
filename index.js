import {createServer} from 'node:http';

import {handlerStaticFile} from './handler-static.js';
import {handlerApiRoute} from "./handler-api-route.js";
import {handlerUserRoute} from "./handler-user-route.js";
import {handlerError} from './handler-error.js';

const server = createServer(
    async (req, res) => {
    try {
        if (req.url.startsWith('/api')) {
            await handlerApiRoute(req, res);
            return;
        }
        if (req.url.startsWith('/user')) {
            handlerUserRoute(req, res);
            return;
        }
        await handlerStaticFile(req, res);

    } catch (err) {
        handlerError(res, err);
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on http://127.0.0.1:3000/');
});
