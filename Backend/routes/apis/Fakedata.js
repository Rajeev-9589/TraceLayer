import express from 'express';
 
 const route = express.Router();

route.get('/fakeapi',(req,res)=>{
    res.send("hey its me rajeev")
})
export default route;
