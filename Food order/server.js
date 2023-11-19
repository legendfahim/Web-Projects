const http = require('http');
const fs = require('fs');

const content = fs.readFileSync('index.html');

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'content-type':'text/html'});
    res.end(content);
});

server.listen(80, '127.0.0.2', ()=>{
    console.log("Server running on port 80");
});
