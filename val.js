const exp = require("express");
const mycon = require("mysql");
var bodyParser = require('body-parser');
const cors = require("cors");
const multer = require('multer');
const upload = multer();
var path = require('path');

const app = exp();
app.use(cors());
app.use(exp.json()); 
app.use(upload.array());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exp.static('public'));


const c = mycon.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "Subby143$143",
    database : "ecom"
});

c.connect(function(err){
    if(err){console.log(err);}
    else{console.log("Database Connected")}
})
app.post('/signvalid',(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
  

    let sql = 'insert into signval(name,email,status)values(?,?,?)';

    c.query(sql,[name,email,0],(err,result)=>{
        if(err){
            let s = {"status":"error"};
            res.send(s);
        }
        if(err == 0){
            let s = {status : id};
                res.send(s);
        }
        else{
            let s = {"status":"Created"};
            res.send(s);
        }
    });

});

// app.post('/signin',(req,res)=>{
//     let username = req.body.name;
//     let password = req.body.email;

//     let sql = 'select * from signval where username=?';

//     c.query(sql,[username],(err,result)=>{
//         if(result.length > 0){
//             let username1 = result[0].username;
//             let password1 = result[0].password;
//             let id = result[0].id;
//             if(username1 == username && password1 == password){
//                 let s = {status : id};
//                 res.send(s);
//             }
//             else{
//                 let s = {status:"error"};
//                 res.send(s);
//             }
//         }
//         else{
//             let s  ={"status":"error"};
//             res.send(s);}
//     })

// });

app.get('/getuserdetails',(req,res)=>{
    let id = req.body.id;
    let sql = 'select * from signup where id=?';
    c.query(sql,[id],(error,result)=>{
        res.send(result);
        
    })
});

app.listen(3100);