//external export
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");


// internal export
const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler");
const loginRouter= require("./router/loginRouter");
const usersRouter= require("./router/usersRouter");
const inboxRouter= require("./router/inboxRouter");
const registerRouter= require("./router/registerRouter");



const app = express();
const server = http.createServer(app);
dotenv.config();

// socket creation
const io = require("socket.io")(server);
global.io = io;
//on time
app.locals.moment = moment;

//database conection
mongoose.
       connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("database connnection successfull!"))
    .catch(err => console.log(err))

//request parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//view engine
app.set("view engine", "ejs");

//set public stattic folder
app.use(express.static(path.join(__dirname,"public")));

//cookie_parse
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);
app.use('/register',registerRouter);



//404 not found
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);


server.listen(process.env.PORT,()=>{
    console.log(`APP IS LISTING TO PORT: ${process.env.PORT}`);
});

