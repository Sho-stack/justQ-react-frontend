const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
const buildPath = path.join(__dirname, 'build');
app.use(serveStatic(buildPath));

const port = process.env.PORT || 5000;

app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});