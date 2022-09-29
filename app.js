const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const adminRoute=require('./routes/admin');

const app=express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));


app.use(adminRoute);


app.listen(8080);