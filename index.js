const app =require('./app.js');
console.log(app.z(app.x,app.y));
const arr = [2,4,7,1,3,8,3];
let result = arr.filter((item)=>{
    return item ===3;
})
console.log(result);

  
const http = require('http');
const data = require('./data');


http.createServer((req,resp) =>
{
    resp.writeHead(200,{'Content-Type':'application\json'});
    resp.write(JSON.stringify(data));
    resp.end();
}).listen(4500);