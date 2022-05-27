// database Connection

// Import mongoose
const mongoose = require('mongoose')

// connection string to connect db with server
mongoose.connect('mongodb://localhost:27017/reminderServer',{
    useNewUrlParser:true
})

// Create model
const User = mongoose.model('User',{
    email: String, 
    uname: String,
    password: Number,
    event:[]
   
})

module.exports={
    User
}
