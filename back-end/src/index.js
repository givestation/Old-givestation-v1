const app = require("./app");
var server = require('http').createServer(app);

const port = process.env.PORT || 5000;

server.listen(80, () => console.log(`Listening on port ${port}..`));
