const fs = require('fs')
const readline = require('readline')

// npm start

const readStream = fs.createReadStream('./L3/access.log', 'utf8')
const writeStream1 = fs.createWriteStream('./L3/89.123.1.41_requests.log')
const writeStream2 = fs.createWriteStream('./L3/34.48.240.111_requests.log')

readline.createInterface({
    input: readStream,
    terminal: false,
}).on('line', (line) => {
    if (line.includes("89.123.1.41")) {
        writeStream1.write(line + "\n")
    }
    else if (line.includes("34.48.240.111")) {
        writeStream2.write(line + "\n")
    }
})
