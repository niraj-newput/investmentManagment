const path = require('path');
const express = require('express');

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, 'index.html');
    app.use(express.static(path.join(__dirname, '/public')));
    app.get('*', function (_, res) { res.sendFile(path.resolve(indexPath))});
    return app;
  }
}
