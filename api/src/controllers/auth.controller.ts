const db = require('../models');
const User = db.users;

//login user
export class AuthController{

    private makeJWT = (user) => {
        return "safdsf"; //TODO
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
                res.send(this.makeJWT(req.body.username));
            })
            .catch((err) => {
                res.status(401).send({
                    message: err.message || 'Wrong username or password.'
                });
            });
    };

    
};