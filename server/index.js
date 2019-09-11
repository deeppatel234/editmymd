const http = require('http');
const mongoose = require('mongoose');

const config = require('./config');
const app = require('./app');

const server = http.Server(app);

mongoose.connect(config.databaseURL, { useNewUrlParser: true }).then(() => {
  server.listen(config.port, () => {
    console.log(`Server Started at port ${config.port}`);
  });
});
