const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');


//login user
export class AuthController{

    public makeJWT = (user) => {
        var jwtToken = jwt.sign(user, process.env.JWT_SECRET || "sadlfkjsfk"); //TODO can't access JWT_SECRET
        return jwtToken;
    };

    //returns the username if jwt token is invalid, else returns empty string.
    public verifyJWT = (jwtToken) => {
        try{
            const user = jwt.verify(jwtToken, process.env.JWT_SECRET || "sadlfkjsfk");
            return user;
        }catch(err){
            return '';
        }
    };

    public login = (req, res) => {
        //Validate request
        if(!req.body.username) {
            res.status(400).send({message: 'Content can not be empty!'});
        }

        //attempt to login the user
        //if user and password found, generate jwt token and return it
        //var jwtToken = 
        User.findOne({ username: `${req.body.username}`, password: `${req.body.password}` })
            .then((data) => {
                res.send({"Authorization": this.makeJWT(req.body.username)});
            })
            .catch((err) => {
                res.status(401).send({
                    message: err.message || 'Wrong username or password.'
                });
            });
    };

    
};