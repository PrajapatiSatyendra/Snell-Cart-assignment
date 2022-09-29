const express=require('express');
const {body}=require('express-validator');
const router=express.Router();
const adminControllers=require('../controllers/admin');

router.put('/',[
                body('email')
                .isEmail()
                .withMessage('Please enter a valid email')
                .normalizeEmail(),
                body('mobileNo')
                .trim()
                .isInt()
                .isLength({min:10,max:10})
                .withMessage("Please enter a valid mobile number")
]
,adminControllers.getLogin);


module.exports=router;