// server creation

// import express
const express =require('express')


// dataservice
const dataService=require('./services/data.service')

// Import jsonwebtoken
const jwt =require('jsonwebtoken')

// import cors
const cors=require('cors')


// create server app using express
const app= express()

// use cors
app.use(cors({
    origin:'http://localhost:4200'
}))

// to parse json data
app.use(express.json())


// Post- TO POST DATA
app.post('/register',(req,res)=>{
    dataService.register(req.body.email,req.body.uname,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
})

// jwtMiddleware - to verify token
const jwtMiddleware= (req,res,next)=>{
    try{
        const token =req.headers["x-access-token"]
        const data= jwt.verify(token,'secret')
        req.currentMail = data.currentMail
        next()
    }
    catch{
        res.status(401).json({
            status:false,
            message:"Please Log In!!!"
        })
    }
}

// login
app.post('/login',(req,res)=>{
    dataService.login(req.body.email,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
})

// dashboard
app.post('/dashboard',jwtMiddleware,(req,res)=>{
    dataService.dashboard(req,req.body.email,req.body.date,req.body.description,)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
})
// 
app.post('/viewevent',jwtMiddleware,(req,res)=>{
    dataService.viewevent(req,req.body.email)
    .then(result=>{
        res.status(result.statusCode).json(result)
         })
   })


// set port number 
app.listen(3000,()=>{
    console.log("server started at 3000");
})