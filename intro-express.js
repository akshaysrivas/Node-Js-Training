const exp = require('express');
const path = require('path');
const publicpath = path.join(__dirname,'public');
const app =exp();
// app.use(express.static(publicpath));
app.set('view engine','ejs');
app.get('',(_,resp)=>
{
    resp.sendFile(publicpath+'/about.html');
    // console.log("data sent by browser",req.query.name);
    // resp.send("<h1>Home Page by "+req.query.name+"</h1>");
});
app.get('/profile',(_,resp)=>
{
    const user= {
        name:"Akshay Srivastava",
        email:"akshays@dckap.com",
        city:"Lucknow",
        skills:["c","php","laravel"]
    }
    resp.render('profile',{user});
    // console.log("data sent by browser",req.query.name);
    // resp.send("<h1>Home Page by "+req.query.name+"</h1>");
});
app.get("/about",(req,resp)=>
{
    resp.send("about Page");
});
app.get("/contact-us",(req,resp)=>
{
    resp.send("contact-us Page");
});
app.get('*',(req,resp)=>
{
    resp.sendFile(publicpath+'/npage.html');
});
app.listen(5000);