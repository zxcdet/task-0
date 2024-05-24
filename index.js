import { createServer } from 'node:http';
import { readFile, createReadStream} from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
 const server = createServer((req, res) => {
     if (req.url.match(/.css$/)) {
         res.setHeader('Content-type', 'text/css');
         createReadStream(path.join(__dirname, req.url)).pipe(res)
     }
     if (req.url.match(/.(pg|jpeg|png|gif|webp)$/)) {
         res.setHeader('Content-Type', 'image/jpg');
         createReadStream(path.join(__dirname, req.url)).pipe(res)
     }
     if (req.url.match(/.js$/)) {
         res.setHeader('Content-type', 'text/javascript');
         createReadStream(path.join(__dirname, req.url)).pipe(res)
     }
     readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) throw err;
         res.end(data);
    });
     if (req.url === '/data') {
         res.end(JSON.stringify({name: 'data'}));
     }
 });

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
