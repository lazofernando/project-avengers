const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html')
    res.end('<b>Hola Mundo</b>')
})

server.listen(port, hostname, ()=>{
    console.log(`El servidor se esta ejecutando en: http://${hostname}:${port}`)
})