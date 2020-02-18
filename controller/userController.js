const User = require('../models/User');
const { checkPass } = require('../helpers/hashPassword');
const { generateToken } = require('../helpers/jwt');
const passport = require("passport");

class UserController {

    static readAll(req,res,next) {
        User.find({})
            .then(function(users) {
                res.status(200).json(users)
            })
            .catch(next);
    };


    static create(req,res,next) {

        let { name, email, password, confirm_password } = req.body;

        if (password !== confirm_password) {
            next({message: "Confirm password doesn't match with password"})
        }else {
            User.create({
                name,
                email,
                password
            })
            .then(function(user) {
                res.status(202).json(user)
            })
            .catch(next);
        };
    };

    static login(req,res,next) {
        let { email, password } = req.body;
        User.findOne({email})
            .then(function (user) {
                if (user && checkPass(password, user.password)) {
                    let payload = { 
                        id: user.id,
                        name: user.name,
                        email: user.email
                     }
                     let token = generateToken(payload);
                     res.status(201).json({message: `Welcome ${user.name}, hope you have a nice day`, token})
                }else {
                    next({message: 'Invalid Username / Password'});
                }
            })
    };

    static readMe(req,res,next) {
        let userId = req.decoded.id;

        User.findOne({_id: userId}).populate('account')
            .then(function(user) {
                res.status(200).json(user);
            })
            .catch(next);
    };

    static getAuth(req,res,next) {
        let userId = req.decoded.id
        passport.authenticate("jwt", { session: false }),
        (req, res) => {
            return res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
            });
        };
    };



};


module.exports = UserController;
