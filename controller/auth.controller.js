const dotenv = require('dotenv');
const Models = require('../models');
const User = Models.User;
const Company = Models.Company;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail')

dotenv.config();

exports.healthCheck = async (req, res) => {
  try {
    res.send('respond with a resource');
} catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signup = async(req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    var usr = {
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      password : await bcrypt.hash(req.body.password, salt),
      isAlreadyLogin:0
    };
    created_user = await User.create(usr);
    res.status(201).json(created_user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async(req, res, next) => {
const user = await User.findOne({ where : {email : req.body.email }});
 if(user){
    const password_valid = await bcrypt.compare(req.body.password,user.password);
    if(password_valid){
      console.log(password_valid);
      await User.update(
        { isAlreadyLogin: 1 },
        { where: { id: 9} }
      )
       // token = jwt.sign({ "id" : user.id,"email" : user.email,"first_name":user.first_name },process.env.SECRET);
        res.status(200).json(user);
    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
  
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
};
  
exports.registerCompany = async (req, res) => {
  try {
  var company = {
    name: req.body.name,
    brand_name: req.body.brand_name,
    industry: req.body.industry,
    buyer_persona: req.body.buyer_persona,
    description: req.body.description,
    image:req.body.image
  };
  created_company = await Company.create(company);
  res.status(201).json(created_company);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateSocialAccount = async (req, res) => {
  try {
  updated_social_account = await User.update(
    { linkedIn: req.body.linkedIn },
    { where: { id: req.params.id} }
  )
  res.status(201).json(updated_social_account);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateUSer = async (req, res) => {
  try {
  update_user = await User.update(
    { first_name: req.body.linkedIn },
    {last_name:req.body.last_name},
    {title:req.body.title},
    { where: { id: req.params.id} }
  )
  res.status(201).json(updated_social_account);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.verifyEmail=async(req,res)=>{
  //const jwt = require('jsonwebtoken');


  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'urban.grant92@ethereal.email',
        pass: '4jyYy2d84duTdBAdvM'
    }
});
  /*const transport = require('nodemailer').createTransport({
    host: mailhog,
    port: 1025,
    secure: false,
  });*/
  
  /*const token = jwt.sign({
      data: 'Token Data' .
    }, 'ourSecretKey', { expiresIn: '10m' }
  );	*/
  
  const mailConfigurations = {
  
    // It should be a string of sender/server email
    from: 'urban.grant92@ethereal.email',
  
    to: 'tucorafemme-4297@yopmail.com',
  
    // Subject of Email
    subject: 'Email Verification',
    
    // This would be the text of email body
    text: `Hi! There, You have recently visited
      our website and entered your email.
      Please follow the given link to verify your email
      https://www.google.com/
      Thanks`
    
  };
  
  transporter.sendMail(mailConfigurations, function(error, info){
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
  });
  

  
  

}
exports.verifyEmail2=async(req,res)=>{
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maryam.powlowski@ethereal.email',
        pass: 'yj3p9EKJXmnEHkQARD'
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <bhargav@gmail.com>', // sender address
    to: "bsmudrakol@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Please verify your email", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


exports.sendgrid=async(req,res)=>{
  
sgMail.setApiKey("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")

const msg = {
  to: 'firstone@yopmail.comm', // Change to your recipient
  from: 'bsmudrakol@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
    //res.status(200);
  })
  .catch((error) => {
    console.error(error)
  })
}

