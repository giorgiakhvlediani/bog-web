const config = require('./config.js');
const http = require('http');
const https = require('http');

class App {
  constructor() {
    this._server = null;
    this._env = config.NODE_ENV;
    this._port = config.PORT;
    this._host = config.HOST;
    this._connections = [];
  }

  start() {
    if (this._server) return;

    if (config.USE_HTTPS) {
      const options = {
        key: fs.readFileSync(config.HTTPS_KEY),
        cert: fs.readFileSync(config.HTTPS_CERT),
      };

      this._server = https.createServer(options, (req, res) => {
        this.handleRequest(req, res, https);
      });
    } else {
      this._server = http.createServer((req, res) => {
        this.handleRequest(req, res);
      });
    }

    this._server.listen(this._port, this._host, () => {
      console.log(`server running at http://${this._host}:${this._port}/`);
    });

    this._server.on('connection', (connection) => {
      console.log('შემოვიდა');
      this._connections.push(connection);
      console.log(this._connections.length);
      connection.on('close', () => {
        console.log('გავიდა');
        this._connections = this._connections.filter((curr) => {
          return curr !== connection;
        });
      });
    });

    process.on('SIGINT', () => {
      console.log('Received SIGINT');
      this.stop()
    });

    process.on('uncaughtException', (err) => {
      console.log(`Uncaught Exception: ${err.message}`);
      process.exit(1);
    });
  }

  _closeConnections() {
    console.log('Closing connections');
    this._connections.forEach((connection) => {
      connection.end('Server is restarting\n');
      connection.destroy();
    });
  }

  handleRequest(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    const { url } = req;
    console.log(url)
    if (req.url === '/favicon.ico') {
      http.get('http://i.pinimg.com/originals/70/8f/04/708f04dc59840d0b6e92ef4f4ed967f8.png', (faviconRes) => {
        console.log(faviconRes)
        res.setHeader('Content-Type', 'image/x-icon');
        res.writeHead(faviconRes.statusCode, faviconRes.headers);
        faviconRes.pipe(res);
      }).on('error', (e) => {
        console.error(`Error fetching favicon: ${e.message}`);
        res.writeHead(500);
        res.end();
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World');
    }
  }


  stop() {
    if (this._server) {
      console.log('server is closed');
      this._server.close(() => {
        this._closeConnections();
        process.exit(0);
      });
    }
  }
}

const app = new App();
app.start();
