require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const app = express();
const middlewarService = require('./middleware/middlware');

const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')
// const accessModuleRoute = require('./routes/accessModuleRoute')
const role = require('./routes/roleRoutes')

const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(middlewarService.verifyUser)

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/role', role)

app.use((req, res)=>{
  res.json({status : 400, message : "invalid route", data : {}})
})

app.listen(3000, ()=>{
    console.log("server is running on port : 3000")
})