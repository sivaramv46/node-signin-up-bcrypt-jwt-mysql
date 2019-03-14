const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlcofig = require('../utils/sqlconnection');
const con = sqlcofig;

//Login
router.post('/login',(req,res)=>{
            var email = req.body.email;
            
            console.log(email,req.body.password);

            con.query('SELECT * FROM Users WHERE email = ? ', [email], function(error, results, fields) {      
             
                //if connection error or timeout
             if(results=== undefined){
                 console.log("Connection error")
             }
             else{      
                 //checking incorrect Email or password
                     if (  results.length < 1) {
                    res.status(401).json({
                    "message": "Incorrect Email or Password ",
                    "success": false
                }) } 
                //verifing the passsword
                else{
                    console.log(results)
                    const match =  bcrypt.compareSync(req.body.password,results[0].password)
                    if(match)
                    {
                        const token = jwt.sign(
                            {//payload
                                email:  results[0].email,
                                id: results[0].username

                            },
                            "secret",  //secret key 
                            {
                                    expiresIn: "24h" //token expires timeout
                            }
                        );

                        res.status(200).json({
                            "message": "login successful ",
                           "success": true,
                            token: token
                    
                        })

                    }
                    //Response for incorrect 
                    else{
                        console.log('Incorrect password')
                        res.status(401).json({
                                              "message": "Incorrect Password",
                                             "success": false
                                          })

                    }
                }
            }

                       res.end();
            })

        
        })
            
    
    module.exports = router;