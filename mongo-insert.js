const dbConnect= require('./dbconnect');
const insert =async()=>{
    const db = await dbConnect();
    const result =await db.insert([{  name:"Google Pixel1",brand:"Google",price:"1100",categor:"mobile"},{  name:"Google Pixel2",brand:"Google",price:"1100",categor:"mobile"    
    }])
    if(result.acknowledged)
    {
        console.log("data inserted");
    }
}
insert()
// For update use db.updateOne({name:'m40'},{$set:{brand:'oppo'}})
//For delete use db.deleteOne({name:'m40'})
