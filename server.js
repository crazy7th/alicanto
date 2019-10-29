const express = require('express')
const next = require('next')

const port = parseInt(process.env.NODE_PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
//const app = next({ dev })
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const { join } = require('path');

const ServiceWorker = app => (req, res) => {
  const filePath = join(__dirname, '../', '.next', 'service-worker.js');

  app.serveStatic(req, res, filePath);
};

app.prepare().then(() => {
  const server = express()

  //server.get('/sw.js', (req, res) => app.serveStatic(req, res, path.resolve('./static/sw.js')))
  
  server.get('/service-worker.js', ServiceWorker(app));

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

