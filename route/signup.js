const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const sqlcofig = require('../utils/sqlconnection');
const con = sqlcofig;

router.post('/signup',(req,res)=>{
  
  //creating hash for password

  bcrypt.hash(req.body.password,10,(err,hash)=>{
    
    if(err){ res.status(500),json({
      "message":"hash error"
    })}
    else{
      console.log(hash)
      const date = new Date();
  
      var users={ 
        "firstName":req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "username":  req.body.username,
       "password": hash, 
        "createdAt": date,
        "updatedAt": date
       }
       console.log(users.updatedAt,"-------",users.createdAt,"---",users.firstName,"---",users.lastName,"---",users.email,"---",users.username,"---",users.password)

       //verifing Email already exists
    if (users.email) {
        
         con.query('SELECT * FROM Users WHERE email = ? ', [users.email], function(error, results, fields) {  
     
             console.log("ERROR:",error)
             console.log(results)
             if (results.length > 0) {
                 res.status(409).json({
                     "message": "Email Already Exists",
                     "success":false
                 })
                
                }
                //Inserting data in mysql db
                else{
                    con.query('INSERT INTO Users SET ?',users,  (error, results)=> {
                        if (error) {
                          console.log("error ocurred",error);
                          res.status(400).json({
                            "message":"error ocurred",
                            "success":false
                          })
                        }else{
                          console.log("inserted sucessfully");
                          res.status(200).json({
                            "message":"user registered sucessfully",
                            "success":true
                              });}})
                
                }
            })
          }
    }
    
  })

   
})
module.exports = router;