const http = require('http');
const mongoose = require('mongoose');
const { ENV_PATH } = require('./path');

// set Environment variables
require('dotenv').config({ path: ENV_PATH });
const { app, port } = require('./app');

const mongoDbURI = process.env.DBURI;

const server = http.Server(app);

mongoose.connect(mongoDbURI, { useNewUrlParser: true }).then(() => {
  server.listen(port, () => {
    console.log(`Server Started at port ${port}`);
  });
});
