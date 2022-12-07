
const hhtp = require('http');

const server = http.createServer((request, response) => {
    response.end("Mi primer hola mundo desde backend")
})

server.listen(3000, ()=>{
    console.log("escuchando puerto 8080");
})