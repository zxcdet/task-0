import { createServer } from 'node:http';
import { readFile, createReadStream} from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mime from "mime-types";
import {router} from "./router.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 const server = createServer((req, res) => {
     try {
         if (req.url.startsWith('/api')) {
             router(req, res);
             return;
         }
         if (req.url !== '/') {
             if (!mime.lookup(req.url)) {
                 return    readFile(path.join(__dirname, 'static', 'pages', 'error.html'), (err, data) => {
                     if (err) throw err;
                     res.end(data);
                 });
             }
             res.setHeader('Content-type', mime.lookup(req.url));
             createReadStream(path.join(__dirname, 'static', req.url)).on('data', (chunk) => {
             }).pipe(res)
         }
         readFile(path.join(__dirname, 'static', 'pages', 'index.html'), (err, data) => {
             if (err) throw err;
             res.end(data);
         });
     } catch (err)  {
         res.writeHead(500, {'Content-Type': 'text/plain'});
         res.end('Server error');
     }
 });

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
