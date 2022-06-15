// const {MongoClient} = require('mongodb');
// // const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
// const databaseName='e-comm'
// const client= new MongoClient(url);

// async function getData()
// {
//     let result = await client.connect();
//     db= result.db(databaseName);
//     collection = db.collection('products');
//     let data = await collection.find({}).toArray();
//     console.log(data)


// }

// getData();
const dbConnect= require('./dbconnect');

dbConnect().then((resp)=>{
resp.find().toArray().then((data)=>{
console.log(data)
})
})

// const main=async ()=>{
//    let data = await dbConnect();
//    data = await data.find({name:'m40'}).toArray();
//    console.log(data)
// }

// main()