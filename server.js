const path = require('path');
const express = require('express');

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, 'index.html');
    app.use(express.static(path.join(__dirname,'/bundle.js')));
    app.use(express.static(path.join(__dirname,'/assets')));
    app.get('/', function (_, res) { res.sendFile(indexPath)});
    return app;
  }
}
