import jwt from 'json-web-token'
import { User } from '../db/connect.js';



export default async (req, res ,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, '123456');
            req.user = await User.findByPk(decode.id);
            next();
        } catch (error){
            res.status(400).json({error: "token failed"});
        }
    }

    if(!token) 
        res.status(400).json({error: "No token!"});
}




/*export default function(passport) {
    passport.use(new Strategy(async (email, password, done) => {
        const user = null;
        const matched = false;
        
        // Find user
        try {
            user = await User.findOne({where: {email: email}});
        }
        catch (err) {
            throw err;
        }
        
        if (!user) {
            return done(null, false, { message: 'No user found' });
        }

        // Match password
        try {
            matched = await user.matchPassword(password);
        }
        catch (err) {
            throw err;
        }

        if (matched) {
            return done(null, user);
        } 
        else {
            return done(null, false, { message: 'Wrong password' });
        }
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.user_id);
    });

    passport.deserializeUser(function (id, done) {
        done(null, User.findByPk(id).user_id);
    });
}*/