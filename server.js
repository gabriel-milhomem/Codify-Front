const path = require('path');
const express = require('express');

const app = express();

app.use(
  express.static(
    path.join(__dirname, 'public'),
  ),
);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT);
