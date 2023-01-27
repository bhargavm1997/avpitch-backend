var express = require('express');
var router = express.Router();
const authController = require('../controller/auth.controller');

router.get('/',authController.healthCheck);

router.post('/register', authController.signup);

//router.put('/updateUser', authController.updateUser);

router.post('/login',authController.signin);

router.post('/company',authController.registerCompany);

router.put('/socialAccount/:id',authController.updateSocialAccount);

router.post('/verifyEmail',authController.sendgrid)

router.post('/upload', (req, res) => {
    const { image } = req.files; 

    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    //if (/^image/.test(image.mimetype)) return res.sendStatus(400);
console.log(__dirname)
    image.mv("F:\\alphavalley\\avpitch-backend\\avpitch-backend\\upload\\" + image.name);

   // res.sendStatus(200).send(image);
    res.status(201).send(image);
});

module.exports = router;