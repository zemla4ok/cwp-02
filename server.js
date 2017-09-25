const net = require('net');
const port = 8124;
let seed = 0;
const server = net.createServer((client) => {
    console.log('Client connected');
    client.id = Date.now() + seed++;
    client.setEncoding('utf8');


    client.on('data', (data) => {
        if (data === 'QA') {
            client.write('ACK');
        }
        else{
            client.write('DEC');
        }
    });

    client.on('end', () => {
        console.log('Client disconnected')
    });
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});