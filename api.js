const dbConnect = require('./dbconnect');
const express = require('express');
const mongodb = require('mongodb');
const app = express();
// const data = await dbConnect();

app.use(express.json());
dbConnect().then((data)=>{
app.get('/', async (res, resp) => {
    // data = await data.find().toArray();
    // resp.send(data);
    data.find().toArray().then((data)=>{
        resp.send(data);
        })
});


app.post("/", async (req, resp) => {
    // let result = await data.insert(req.body)
    // resp.send(result)
    data.insert(req.body).then((result)=>{
        resp.send(result);
        })

})
app.put("/:name", async (req, resp) => {
    // console.log(req.body)

    // let result = data.updateOne(  { name: req.params.name },
    //     { $set: req.body }
      
    // )
    // resp.send({ status: "updated" })
    data.updateOne({ name: req.params.name },{ $set: req.body }).then((result)=>{
        resp.send({ status: "updated" });
        })

})
app.delete("/:id", async (req, resp) => {
    console.log(req.params.id);
    // const result = await data.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
    // resp.send(result)
    data.deleteOne({ _id: new mongodb.ObjectId(req.params.id) }).then((result)=>{
        resp.send(result)

})
})
})
app.listen(5000)