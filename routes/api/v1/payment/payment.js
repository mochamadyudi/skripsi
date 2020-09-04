// const cryptoRandomString = require ("crypto-random-string");
// const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

router.post('/', async(req,res)=>{
});
router.get('/success',async(req,res)=>{

});
router.get('/cancle',async(req,res)=>{
    res.send('Cancelled');
});

module.exports = router;

