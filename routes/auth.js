const router = require('express').Router();
const User = require('../model/User');
const Message = require('../model/Message');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validation');
const { loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass
    });
    try{
        const savedUser = await user.save();
        res.send({user: user.email});
    }catch(err){
        res.status(400).send(err.message);
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or Password is not registered');
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);

    res.send('Logged in | ' + token);
});

router.post('/recover', async(req, res) =>{
    sgMail.setApiKey(process.env.API_KEY);
    const message = new Message({
        to: req.body.to,
        from: process.env.EMAIL,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html
    });
    sgMail.send(message).then(res => console.log('Email sent...')).catch((error) => console.log(error.message));
});


module.exports = router;