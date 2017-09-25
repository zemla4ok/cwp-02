const net = require('net');
const fs = require('fs');
const port = 8124;
let seed = 0;
const logger = fs.createWriteStream('client_id.log');
const server = net.createServer((client) => {
    console.log('Client connected');
    client.id = Date.now() + seed++;
    client.setEncoding('utf8');


    client.on('data', (data) => {
        if (data === 'QA') {
            client.write('ACK');
        }
        else{
            //client.write('DEC');
            //console.log(data);
            logger.write(client.id + ' data: ' + data );
            let ans = getRandom();
            client.write(ans);
        }
    });

    client.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});

function getRandom(){
    return Math.random() > 0.5 ? '1' : '0';
}