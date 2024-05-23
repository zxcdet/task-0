import { createServer } from 'node:http';
import { readFile, createReadStream} from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
 const server = createServer((req, res) => {
     if (req.url === '/first-click') {
         readFile(path.join(__dirname, 'first.html'), (err, data) => {
             if (err) throw err;
             res.end(data);
         });
         return
     }
     if (req.url === '/second-click') {
         readFile(path.join(__dirname, 'second.html'), (err, data) => {
             if (err) throw err;
             res.end(data);
         });
         return;
     }
     if (req.url.match(/.jpg$/)) {
         createReadStream(path.join(__dirname, req.url)).pipe(res)
         res.setHeader('Content-Type', 'image/jpg');
     }
     readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) throw err;
         res.end(data);
    });
 });

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
