const usersCtrl = {};

const passport = require('passport');

const User = require("../models/Users")

usersCtrl.renderSignUpForm = (req,res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req,res) => {
    const errors = []; //Almacena todo los objetos que contienen errores
    const{name, password, email, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({text:'Passwords do not match'});
    }
    if (password.length < 4){
        errors.push({text:'Passwords must be at least 4 characters.'});
    }
    if (errors.length > 0){
        res.render('users/signup',{
            errors,
            name
        })
    }else {
        const nameUser = await User.findOne({name: name}).lean();
        if (nameUser){
            errors.push({text:'User already exist'});
            res.render('users/signup',{
                errors,
                name
            })
        }else{
            const newUser = new User({name,password, email});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("success_msg", "You are registered.");
            res.redirect('/users/signin');
        }
    }
};

usersCtrl.renderSigninForm = (req,res) => {
    res.render('users/signin');
};
//la que realmente hace el signin
usersCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    //cambiar en el futuro
    successRedirect: '/',
    failureFlash: true
})

usersCtrl.logout = (req,res) => {
    req.logout();
    req.flash("success_msg", "You are logged out now.");
    res.redirect('/');
};

usersCtrl.profile = (req,res) => {
    res.render('users/profile');
};

module.exports = usersCtrl;
