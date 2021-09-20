const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./require/database')
const PORT = process.env.PORT || 4444
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))


require('./routes/routes')(app,db)
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
    
})