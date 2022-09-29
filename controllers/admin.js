const {validationResult}=require('express-validator');
const path=require('path');
const ejs=require('ejs');
const templatePath=path.join(__dirname,'../views/template.ejs');

/*---------------------------------------Mail Service(Send In Blue)--------------------------------------------------------------*/

const Sib = require('sib-api-v3-sdk');
require('dotenv').config();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey =process.env.API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender = {
    email: 'Enter Email Id of sender',
    name: 'Enter Name of Sender',
}

/*------------------------------------------------------------------------------------------------------------------------------*/

exports.getLogin=(req,res,next)=>{
    const error=validationResult(req);
    if (! error.isEmpty()) {
        const error=new Error('Validation failed');
        error.statusCode=422;
        error.data=errors.array();
        throw error;
    }

    const email=req.body.email;

    res.json({message:"Check your email"});

    const receivers = [
                            {
                                email:email,
                            },
                        ]

    ejs.renderFile(templatePath,{email:email})
    .then(result=>{
        tranEmailApi.sendTransacEmail
        ({
            sender,
            to: receivers,
            subject: 'Email Confirmation',
            htmlContent: result
        })
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        });

    })
    .catch(err=>{
        console.log(err);
    });

};