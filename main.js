import http from 'http';
import fs from 'fs';

const PORT = 3030;
const hostname = 'localhost';

http
  .createServer((req, res) => {
    console.log(`Request ${req.url} received`);

    const ext = req.url.split('.')[1];
    const contentType = {
      js: 'text/javascript',
      css: 'text/css',
      html: 'text/html',
      plain: 'text/plain',
    };

    try {
      if (req.url === '/' || req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(fs.readFileSync('./index.html'));
      } else {
        res.writeHead(200, { 'Content-Type': contentType[ext || 'js'] });
        const route = `.${req.url}`;
        const jsFile = (!ext && fs.existsSync(route) && `${route}/index.js`) || `${route}.js`;
        const filePath = ext ? route : jsFile;
        console.log(`=======> Serving filePath: ${filePath}\n`);

        res.write(fs.readFileSync(filePath));
      }
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write('<h1>404 Not Found</h1>');
      console.log(error);
    }

    res.end();
  })
  .listen(PORT, hostname, () => {
    console.log(`Listening on ${hostname}:${PORT}`);
  });
