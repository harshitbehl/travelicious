const PORT = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');

//cookies
 

/** For accessing the request body */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Index route connection


/** Create Mongoose connection */
var connString = 'mongodb+srv://travel:travel@cluster0.py0mq.mongodb.net/Travel?retryWrites=true&w=majority';
mongoose.connect(connString, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', function()  { 
    console.log('Mongoose connected to '+ connString); 
});
mongoose.connection.on('disconnected', function()  { 
    console.log('Mongoose disconnected '); 
});
mongoose.connection.on('error', function()  { 
    console.log('Mongoose connection error '); 
});


/**for cookies  */
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('views', path.join(__dirname, "FRONTEND_SERVER",'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

/** Create auth routes */
const auth = require('./BACKEND_SERVER/routes/auth');
app.use("/auth", auth);

/** Create travel routes */
const travel = require('./BACKEND_SERVER/routes/travel');
app.use("/travel", travel);


/** Create travel routes */
const booking = require('./BACKEND_SERVER/routes/booking');
app.use("/booking", booking);

// app.get(":any", (req,res) => res.status(404).send({"Error": "This route not found"}));

// Create Index route 
//const indexRouter = require('./BACKEND_SERVER/routes/index');
//app.use("/", indexRouter);

// FOR FRONTEND
const frontend = require('./FRONTEND_SERVER/routes/index');
app.use("/", frontend);

/** Create server */
app.listen(PORT, () => console.log(`\n\nServer started on port ${PORT}\n\n`));

module.exports = app;
