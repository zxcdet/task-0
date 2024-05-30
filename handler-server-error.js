export function handlerServerError(res,err) {
    console.log(err);
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Server error');
}