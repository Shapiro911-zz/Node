const path = require('path');
const http = require('http');
const fs = require('fs');

//npm start or node L4/index.js

let executionDir = process.cwd();

const isDir = (path) => fs.lstatSync(path).isDirectory();

const run = async () => {
    const server = http.createServer((req, res) => {
        const chosenPath = path.join(process.cwd(), req.url);
        let categories = '';

        if (!fs.existsSync(chosenPath)) return res.end('Error: File or directory not found');

        if (!isDir(chosenPath)) {
            return fs.createReadStream(chosenPath).pipe(res);
        }

        fs.readdirSync(chosenPath).forEach(category => {
            const categoryPath = path.join(req.url, category)
            console.log(categoryPath)
            categories += `<li><a href="${categoryPath}">${category}</a></li>`
        })

        const HTML = fs.readFileSync(path.join(executionDir, 'index.html'), 'utf-8').replace('categories', categories);
        res.end(HTML)
    })

    server.listen(5555);
}

run();
