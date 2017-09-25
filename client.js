const net = require('net');
const fs = require('fs');
const shuffle = require('shuffle-array');
const port = 8124;
const client = new net.Socket();

let arr;
client.connect(port, function () {
    console.log('Connected');
    client.write('QA');
    fs.readFile('qa.json', (err, text) => {
        if (!err) {
            arr = JSON.parse(text);
            shuffle(arr);
            console.log(arr);
        }
        else {
            console.log(err);
        }
    })
});

client.on('data', function (data) {
    console.log(data);
    if (data === 'DEC') {
        client.destroy();
    }
});

for (let i = 0; i < arr.length; i++) {
    
}

client.on('close', function () {
    console.log('Connection closed');
});