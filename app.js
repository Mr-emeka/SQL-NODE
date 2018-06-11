
const express = require('express');

const mysql = require('mysql');

const app = express();


//create connection to mysql
const db = mysql.createConnection({
    host : 'localhost',
    user : 'Emeka',
    password : 'chuckBASS',
    database : 'nodemysql'
 });

   //to connect db.connect()
db.connect((err)=> {
    if(err) {
       throw err;
    }
    console.log('mySql connected successfully')
    });

//Create DB
app.get('/createdb',(req, res)=>{
let sql = 'CREATE DATABASE nodemysql';
db.query(sql,(err , result)=>{

if(err) throw err;
console.log(result);
res.send('Database Created....');

});
});

//Create Table
app.get('/createpoststable',(req , res)=>{
let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';

db.query(sql , (err , result) =>{
    if(err) throw err;
    console.log(result);
    res.send('post table create');


});

});
//insert post 1
app.get('/addpost1', (req , res) =>{

let post = {title:'Posy one', body:'this is post number 1'};
let sql = 'INSERT INTO posts SET ?';
//the question mark works as post her in the query
let query = db.query(sql ,post ,(err, result)=>{
if(err) throw err;
console.log(result);
res.send('post 1 added');
});


});

//post 2
app.get('/addpost2', (req , res) =>{

    let post = {title:'Posy two', body:'this is post number 2'};
    let sql = 'INSERT INTO posts SET ?';
    //the question mark works as post her in the query
    let query = db.query(sql ,post ,(err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send('post 2 added');
    });
    
    
    });
//get post
app.get('/getpost', (req , res) =>{

    let sql = 'SELECT * FROM posts';
    //the question mark works as post her in the query
    let query = db.query(sql ,(err, results)=>{
    if(err) throw err;
    console.log(results);
    res.send('post fetched');
    });

    
    });
    
//getting single post
app.get('/getpost/:id', (req , res) =>{

    let sql = ` SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql ,(err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send('post fetched');
    });
    
    
    });

//update post
app.get('/updatepost/:id', (req , res) =>{
    let newTitle ='updated title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql ,(err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send('post updated');
    });
});

//delete post
app.get('/deletepost/:id', (req , res) =>{

    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql ,(err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send('post deleted');
    });
    
    
    });

const port = 5000;
app.get('/',(req , res)=>{

res.send('HOME');

});

app.listen(port,()=>{
 console.log(`server started on port ${port}`);
})