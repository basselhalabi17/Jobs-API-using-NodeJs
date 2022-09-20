const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const ratelimit = require('express-rate-limit')

//swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')

//routes
const authrouter = require('./routes/auth')
const jobsrouter = require('./routes/jobs')
//authenticate user
const auth = require('./middleware/auth')
//db
const connectDB = require('./db/connectdb')

const port = process.env.PORT || 7500
//error handlers
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1 )
app.use(ratelimit({
    windowMs: 15*60*1000,
    max: 100
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/',(req,res)=>{
    res.send('<h1>Jobs API </h1><a href="/api-docs">Documenation</a>')
})
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))


app.use('/api/v1/auth',authrouter)
app.use('/api/v1/jobs',auth,jobsrouter)


app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const start = async ()=>{
    try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port,()=>console.log(`Server is listening on port ${port}...`) )
}
    catch(err){
    console.log(err)
}
}

start()