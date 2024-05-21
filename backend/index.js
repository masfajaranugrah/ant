const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
dotenv.config();
const connectDB  =  require('./database/db.js')
// import router 
const antrianRoute = require('./routes/antrianRouter.js')
const userRoute =  require('./routes/userRouter.js')
const adminRoute =  require('./routes/adminRouter.js')
// const nomerRoute =  require('./routes/nomerRouter.js')

connectDB();
const app = express();
app.use(session({
    secret : process.env.SESS_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie: {
        secure: 'auto'
    }
}))



app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});


const corsOption = {
    credential:true,
    // origin: ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:4173']
    origin: "*"
    
}
app.use(cors(corsOption))

app.use(cors())
app.use(express.json())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser())

app.use('/api/v1/antrian', antrianRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/administrator', adminRoute)
// app.use('/api/v1/nomer', nomerRoute)

// app.listen(process.env.PORT,  () => {
//     console.log(`server running on port http://localhost:${process.env.PORT}`)
// })

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.PORT, () => {
    console.log(`server running on port http://localhost:${process.env.PORT}`)
})
