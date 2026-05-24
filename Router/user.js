const express = require('express'); 

const {handlesignup,handlelogin} = require('../Controller/user');


const router = express.Router();

router.post("/", handlesignup);
router.post("/login" ,handlelogin);

module.exports=router;