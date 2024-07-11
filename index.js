const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/fox_hub')
const path = require('path')

const express = require('express')
const app = express()
app.use(express.static('public'))





const userRoute = require('./routes/userRoutes')
app.use('/', userRoute);


const adminRoute = require('./routes/adminRoute')
app.use('/admin', adminRoute)
const session = require('express-session')
app.use(session({
    secret: 'hello',
    resave: false,
    saveUninitialized: true
}))

app.listen(4000, () => {
    console.log(`http://localhost:4000`);
    console.log(`http://localhost:4000/admin`)
})
