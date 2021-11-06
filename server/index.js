const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./require/database')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(cors({
    origin : ["http://localhost:3000"],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))
require('dotenv').config()
const PORT = process.env.PORT 
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser())
app.use(session({
    key : "userId",
    secret : "secretKey",
    resave : false,
    saveUninitialized : false,
    cookie : {
        expires : 24*60*60
    }
}))
require('./routes/routes')(app,db)
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
    
})