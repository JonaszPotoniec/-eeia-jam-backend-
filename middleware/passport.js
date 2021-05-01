import jwt from 'json-web-token'
import { User } from '../db/connect.js';
import * as statuses from '../controllers/httpStatusCodes.js' 


export default async (req, res ,next) => {
        try {
            if(!req.headers.cookie)
                throw new Error( "no cookie!")
            
            const token = req.headers.cookie.split('=')[1]
            if(!token)
                throw new Error("no token")
            
            const decode = jwt.decode(token, process.env.JWT_SECRET);
            req.user = await User.findByPk(decode.id);
            next();
        } catch(error){
            respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
        }
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