const express = require('express');
const bodyParser = require('body-parser');
const weatherRoute = require('./Routes/routes');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});


app.use("/", weatherRoute);

app.use((req, res, next)=>{
    const error = new Error("Invalid Route!!!");
    return next(error);
});

app.use((err,req,res,next)=>{
    const error = err.message || 'Something went Wrong!!!';
    res.json(error);
});


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Running");
});