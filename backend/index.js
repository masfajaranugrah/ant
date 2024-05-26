const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
dotenv.config();
const connectDB  =  require('./database/db.js');

// Import router 
const antrianRoute = require('./routes/antrianRouter.js');
const userRoute =  require('./routes/userRouter.js');
const adminRoute =  require('./routes/adminRouter.js');

// Connect to database
connectDB();

const app = express();
app.use(session({
    secret : process.env.SESS_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(express.json());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(cors()); // Enable CORS

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`); // Log each request
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/v1/antrian', antrianRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/administrator', adminRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
