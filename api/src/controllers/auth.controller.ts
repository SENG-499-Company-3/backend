const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//login user
export class AuthController{

    #JWT_SECRET: string = "sadlfkjsfk"
    #saltRounds: number = 10;

    // public hashPassword = (pass) => {
    //     //var hashReturn = "";

    //     var salt = bcrypt.genSalt(this.#saltRounds, (err, salt) => {
    //         return salt;
    //     });

    //     var hashReturn = bcrypt.hash(pass, salt, (err, hash) => {
    //         return hash;
    //     });

    //     return hashReturn;

    //     bcrypt.genSalt(this.#saltRounds, function (err, salt) {
    //         bcrypt.hash(pass, salt, function (err, hash) {
    //             return hash;
    //         });
    //       });
    //     return hashReturn;
    // };

    // public hashPassword = await bcrypt.genSalt(this.#saltRounds, function(err, salt) {
    //     bcrypt.hash("sdafds", salt, function(err, hash){
    //         return hash;
    //     })
    // })
    
    // function(pass) {

    //     const salt = bcrypt.genSaltS(this.#saltRounds);
    //     console.log({"here": salt});

    //     const hash = await bcrypt.hash(pass, salt);
    //     return hash;
        
    // }

    public hashPassword = (pass) => {
        bcrypt.hash(pass, this.#saltRounds, function(err, hash) {
            return hash;
        })
    };


    public makeJWT = (user) => {
        var jwtToken = jwt.sign(user, process.env.JWT_SECRET || this.#JWT_SECRET); //TODO can't access JWT_SECRET
        return jwtToken;
    };

    //returns the username if jwt token is invalid, else returns empty string.
    public verifyJWT = (jwtToken) => {
        try{
            const user = jwt.verify(jwtToken, process.env.JWT_SECRET || this.#JWT_SECRET, { expiresIn: 60*60*4 });
            return user;
        }catch(err){
            return '';
        }
    };

    // public login = (req, res) => {
    //     //Validate request
    //     if(!req.body.username) {
    //         res.status(400).send({message: 'Content can not be empty!'});
    //     }

    //     //attempt to login the user
    //     //if user and password found, generate jwt token and return it
    //     //var jwtToken = 
    //     bcrypt.genSalt(this.#saltRounds, function (err, salt) {
    //         bcrypt.hash(req.body.password, salt, function (err, hash) {

    //             User.findOne({ username: `${req.body.username}`, password: hash })
    //                 .then((data) => {
    //                     //res.send({"Hashed": this.hashPassword(req.body.password)})
    //                     res.send({"Authorization": this.makeJWT(req.body.username)});
    //                 })
    //                 .catch((err) => {
    //                     res.status(401).send({
    //                         message: err.message || 'Wrong username or password.'
    //                     });
    //                 });
    //      })
    //     })
    // };

    public login = (req, res) => {
        //Validate request
        if(!req.body.username) {
            res.status(400).send({message: 'Content can not be empty!'});
        }

        bcrypt.genSalt(this.#saltRounds, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
            
            //attempt to login the user
            //if user and password found, generate jwt token and return it
            User.findOne({ username: `${req.body.username}`, password: hash })
                .then((data) => {
                    //res.send({"Hashed": hash})
                    var jwtToken = this.makeJWT(req.body.username);
                    User.findOneAndUpdate({username: `${req.body.username}`}, 
                    {$set: {token: jwtToken}}).then(
                    //user.token = jwtToken;
                    res.send({"Authorization": jwtToken}));
                })
                .catch((err) => {
                    res.status(401).send({
                        message: err.message || 'Wrong username or password.'
                    });
                });
            })    
        })
    };

    // public login = (req, res) => {
    //     //Validate request
    //     if(!req.body.username) {
    //         res.status(400).send({message: 'Content can not be empty!'});
    //     }

    //     var hash = await bcrypt.hash(req.body.password, this.#saltRounds);
    //     console.log(hash);

    //     //attempt to login the user
    //     //if user and password found, generate jwt token and return it
    //     //var jwtToken = 
    //     User.findOne({ username: `${req.body.username}`, password: `${req.body.password}` })
    //         .then((data) => {
    //             res.send({"Hashed": hash})
    //             //res.send({"Authorization": this.makeJWT(req.body.pass)});
    //         })
    //         .catch((err) => {
    //             res.status(401).send({
    //                 message: err.message || 'Wrong username or password.'
    //             });
    //         });
    // };
};