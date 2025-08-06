import express from 'express';
import path, {dirname } from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import fs from 'fs';
import { platform } from 'os';
import { exec } from 'child_process';
import {buildPage} from "./build-page.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function readJsonFile(filePath) {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } else {
    console.error(`File '${filePath}' does not exist.`);
    return null;
  }
}

const widgetsConfig = readJsonFile(path.join(__dirname, 'pages-config.json'));

const app = express(); // NOSONAR
const port = 5138;

const open = platform() === 'win32' ? 'start' : 'open';

// Use compression middleware for gzip
app.use(compression());

const urls = Object.keys(widgetsConfig);

// Middleware to serve files based on routes
app.use((req, res, next) => {
  const path = req.path.split('?')[0]?.replace(/^\//, '');
  if (!path) {
    res.redirect(`/home`);
  } else if (urls.includes(path)) {
    const pageContent = buildPage(path);
    if (pageContent) {
      res
        .set('Content-Type', 'text/html')
        .status(200)
        .end(pageContent);
    } else {
      res.status(404).send('File not found');
    }
  } else {
    next();
  }
});

// Serve static files from the digital-ui-assets folder
app.use(express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // Open the browser
  exec(`${open} http://localhost:${port}/home`); // NOSONAR
});