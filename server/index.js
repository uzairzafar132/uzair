const express = require("express")
const app = express()
require("dotenv").config();
var cors = require('cors')
app.use(cors())

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 

//use cors to allow cross origin resource sharing

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

var nodemailer = require('nodemailer');

app.all("/data",  (req, res) => {
    console.log(req.body)
	let  email =  req.body.email;
    let name = req.body.name;
    let message=  req.body.message;
    
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jfazil72@gmail.com',
    pass: 'Abcd@112233'
  }
});

var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: name,
    text:message,name
    
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
      
    console.log('Email sent: ' + info.response);
  }
});
});
// //

const port = 4000

// app.post('/send_mail', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

