require('dotenv').config();
console.log(process.env.PORT);
console.log(process.env.APP_KEY);
console.log(process.env.NODE_ENV);

const http = require('http');

const app = require('./src/app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.on('listening',function(){
    console.log('ok, server is running port=' + port);
});

//db.sequelize.sync({force: true}).then(function () {
    server.listen(port);
    console.log('Server listening on port ' + port);
//})

