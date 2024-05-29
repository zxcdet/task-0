import { readFile, createReadStream} from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export  function router(req, res) {
    if (req.url === '/api/data') {
        res.end(JSON.stringify({name: 'data'}));
        return;
    }
    if (req.url === '/api/second-route') {
        readFile(path.join(__dirname, 'static', 'pages', 'second.html'), (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }

    if (req.url === '/api/open-file1') {
        readFile(path.join(__dirname, 'static', 'text', 'main.txt'), (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }

    if (req.url === '/api/open-file2') {
        readFile(path.join(__dirname, 'static', 'json',  'data.json'), (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }
}