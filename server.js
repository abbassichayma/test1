const express = require('express')
const app = express()
const connect = require('./config/connect')
const initialisation = require('./config/setUp')
const userRouter = require('./routes/user.route')
const roleRouter = require('./routes/role.route')
const articleRouter = require('./routes/article.route')
const heartRouter = require('./routes/heart.routes')
const cors = require('cors')
require('dotenv').config()


app.use(express.json())
app.use(cors());
app.use('/user',userRouter)
app.use('/role',roleRouter)
app.use('/article',articleRouter)
app.use('/heart',heartRouter)
const PORT = 9000 || process.env.PORT;
connect()
initialisation()
app.listen(PORT,(err)=>{
    if(err) throw console.log(err)
    console.log('listen to port '+PORT)
})