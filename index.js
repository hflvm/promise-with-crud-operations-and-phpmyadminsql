// normall callback function
function delay(callback, duration) {
  setTimeout(() => {
    callback();
  }, duration);
}
//الشكل الهرمي
delay(()=> {
  console.log('first done!');
  delay(()=> {
    console.log('second done!');
    delay(()=> {
      console.log('third done!');
    }, 200);
  }, 300);
}, 500);
//----------------------------------------------
// Promise
let delay = duration => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, duration);

  // setTimeout(()=> {
  //   reject('Error');
  // }, 200);
});

// delay(300)
//   .then((a)=> console.log(a))
//   .catch((error)=> console.log(error));

let first = delay(500)
  .then(()=> {
    console.log('first promise')
    return 'First';
  });

let second = delay(300)
  .then(()=> {
    console.log('second promise');
    return 'Second';
  });

let third = delay(200)
  .then(()=> {
    console.log('third promise')
    return 'Third';
  });

Promise.all(
  [
    first,
    second,
    third
  ]
).then((value)=>console.log(value));

//-----------------------------------------------promise with crud operations--------------------------------------------
const mysql = require('mysql');
const express = require('express');
const promise = require('promise');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teriaq_node',
    multipleStatements: true
});
//---------------------------------------------------------------------------------------------------------
function connection(){
  return new Promise(fn);
   function fn(resolve,reject){
     mysqlConnection.connect((err) => {
         if (err)
             return reject('DB connection failed \n Error : ' + err);
         else{
           return resolve('DB connection succeded.');
         }

     });
  }
}
connection()
.then(function(rows){
  console.log(rows);
})
.catch(function(err){
  console.log(err);
});
//---------------------------------------------------------------------------------------------------------
const port = process.env.PORT || 8086;
app.listen(port , ()=>console.log(`listening on port ${port}`));
//---------------------------------------------------------------------------------------------------------
//Get all doctors
function getusers(){
  return new Promise(fn);
   function fn(resolve,reject){
app.get('/api/doctors', (req, res) => {
    mysqlConnection.query('SELECT doctor.*,specialty.name_specialty as specialty_name FROM specialty INNER JOIN doctor ON specialty.id_specialty = doctor.Your_specialty_id', (err, rows, fields) => {
        if (!err)
          return resolve(res.send(rows));
        else
            return reject(err);
    })
});
}
}
getusers()
.then(()=>{
  console.log("getting all users");
})
.catch(function(err){
  console.log(err);
});
//---------------------------------------------------------------------------------------------------------
//Get an doctors
function getuser(){
  return new Promise(fn);
   function fn(resolve,reject){
app.get('/api/doctors/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM doctor WHERE DocID = ?', [req.params.id], (err, rows, fields) => {
      if (!err)
        return resolve(res.send(rows));
      else
          return reject(err);
    })
});
}
}
getuser()
.then(()=>{
  console.log("getting users");
})
.catch(function(err){
  console.log(err);
  });
//---------------------------------------------------------------------------------------------------------
//Insert an doctors
function insert(){
  return new Promise(fn);
   function fn(resolve,reject){
app.post('/api/doctors', (req, res) => {
    let doc = req.body;
    var sql = "INSERT INTO doctor(DocUsername,DocPassword,DocEmail,DocPhone,DocAddress,DocIDCard,DocFullName,Your_specialty_id) VALUES ?";
var values =[[doc.DocUsername,doc.DocPassword,doc.DocEmail,
doc.DocPhone,doc.DocAddress,doc.DocIDCard,doc.DocFullName,
doc.Your_specialty_id]];
    mysqlConnection.query(sql, [values], (err, rows, fields) => {
      if (!err)
        return resolve(res.send("inserted users"));
      else
          return reject(err);
    })
});
}
}
insert()
.then(()=>{
  console.log("inserted users");
})
.catch(function(err){
  console.log(err);
  });
//---------------------------------------------------------------------------------------------------------
//Update an doctors
function update(){
  return new Promise(fn);
   function fn(resolve,reject){
app.put('/api/doctors/:id', (req, res) => {
    let doc = req.body;
    var sql = "UPDATE doctor SET DocUsername = ?,DocPassword = ?,DocEmail = ?,DocPhone = ?,DocAddress = ?,DocIDCard = ?,DocFullName = ?,Your_specialty_id = ? WHERE DocID = ?";

    mysqlConnection.query(sql, [doc.DocUsername,doc.DocPassword,doc.DocEmail,
    doc.DocPhone,doc.DocAddress,doc.DocIDCard,doc.DocFullName,
    doc.Your_specialty_id,req.params.id], (err, rows, fields) => {
      if (!err)
        return resolve(res.send("update users"));
      else
          return reject(err);
    })
});
}
}
update()
.then(()=>{
  console.log("update users");
})
.catch(function(err){
  console.log(err);
  });
//---------------------------------------------------------------------------------------------------------
//Delete an doctors
function deleteing(){
  return new Promise(fn);
   function fn(resolve,reject){
app.delete('/api/doctors/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM doctor WHERE DocID = ?', [req.params.id], (err, rows, fields) => {
      if(!err)
      return resolve(res.send("deleteing users"));
    else
        return reject(err);
    })
});
}
}
deleteing()
.then(()=>{
  console.log("deleteing users");
})
.catch(function(err){
  console.log(err);
  });
//---------------------------------------------------------------------------------------------------------
