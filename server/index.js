const http = require('http');
const { ENV_PATH } = require('./path');

// set Environment variables
require('dotenv').config({ path: ENV_PATH });
const { app, port } = require('./app');

const server = http.Server(app);

server.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});
