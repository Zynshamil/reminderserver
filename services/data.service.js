// import db
const db = require('./db')

// Import jsonwebtoken
const jwt =require('jsonwebtoken')
const req = require('express/lib/request')
const { get } = require('express/lib/response')



    // register - index.js will give uname,acno,password
    const register = (email, uname, password)=>{
       
        // asynchronous
        return db.User.findOne({email})
        .then(user=>{
          if(user){
            // acno already exist in db
            return {
              statusCode:401,
              status:false,
              message:"Email already exists"
            }
          }
          else{
            const newUser= new db.User({
              email,
              uname,
              password,
              
            })
            newUser.save()
            return {
              statusCode:200,
              status:true,
              message:"Successfully registerd...Please Log In"
            }
          }
        })
  
        }

        // Login

         // login
  const login = (email,password) =>{
    // user entered acno n password
  
  
    return db.User.findOne({email,password})
    .then(user=>{
      if(user){
      
          currentUser=user.uname
          currentMail=user.email

           // Token generate
           const token= jwt.sign({
            currentMail:email
          },'secret')
          
          
           

          return  {
            statusCode:200,
            status:true,
            message:" Log In Successfull",
            currentUser,
            currentMail,
            token
          
          }
        
      }
      else {
        return {
          statusCode:401,
          status:false,
          message:"user does not exist "
        }
      }
    })  
  }   
    //  Dashboard

     const dashboard = (req,email,date,description)=>{
       console.log(email);
        return db.User.findOne({email})
       .then(user=>{
         if(req.currentMail!=email){
        
            return {
              statusCode:422,
              status:false,
              message:"Incorrect email, Please log in"
            }
          }
          else{
            if(user){

          
              user.event.push({
                date:date,
                description:description
                        
           })
           user.save()
                return{
                  statusCode:200,
                  status:true,
                  message:"Successfully added event  " +description
                } 
              }
          }
        })
        
      
      }

      // viewevent
      const viewevent = (req,email)=>{
        console.log(email);
        return db.User.findOne({email})
        .then(user=>{
          if(user){
           if(req.currentMail!=email){
            return{
              statusCode:401,
              status:false,
              message:"Incorrect email, Please log in"
            }
           }
          else{
            return{
            statusCode: 200,
            status: true,
            event:user.event
          }
         }
          }
        })
      }
      
        

        module.exports={
            register,
            login,
            dashboard,
            viewevent
        }