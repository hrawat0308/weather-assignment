const express = require('express');
const router = express.Router();
const weatherController = require('../Controller/weatherController');

router.post("/getWeather", (req, res, next)=>{
    if(req.body.cities.length === 0){
     const error = new Error("Please Enter some Cities!!!!");
     return next(error);   
    }
    req.body.cities.forEach((city)=>{
        if(city.trim().length === 0){
            const error = new Error("Please Enter Valid City Names!!!");
            return next(error);
        }
    });
    next();
}, weatherController.getWeather);



module.exports = router;

