import {User, Hash} from '../db/connect.js'
import transporter from '../config/mail.js'
import * as statuses from './httpStatusCodes.js' 
import {respondWithError, respondWithJSON} from '../config/utils.js'
import cryptoRandomString from 'crypto-random-string'
const registerUser = async (req,res) => {
    

    // req.checkBody('name', 'Name is required').notEmpty();
    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('last_name', 'Last name is required').notEmpty();
    // req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    // const errors = req.validationErrors();
    // console.log(errors);

    const { email, password, password2, name, last_name} = req.body

    try{
        if(password.localeCompare(password2) !== 0){
            respondWithError(res, statuses.HTTP_BAD_REQUEST, "Passwords does not match!")
            return;
        }

        let user = await User.findOne({where: {email: email}});
        if(user){
            respondWithError(res, statuses.HTTP_BAD_REQUEST, "User with that email already exists!")
            return;
        }

        user = await User.create({email, password, name, last_name});
        if(!user){
            respondWithError(res, statuses.HTTP_BAD_REQUEST, "Wrong Form Update!")
            return;
        }
        
        const hashedStr = cryptoRandomString({length: 128});
        const user_id = user.get('user_id');
        const hash = await Hash.create({hash: hashedStr, user_id: user_id});

        await hash.save();
        await user.save();

        const mailOptions = {
            from: "teslamatb@gmail.com",
            to: user.get('email'),
            subject: "Verification email",
            text: `http://localhost:5000/verify/${hash.get('hash')}`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err)
                throw new Error("mailer error");
        });

        respondWithJSON(res,statuses.HTTP_OK,{
            user,
            authToken: await user.generateAuthToken(),
        });
    }catch(error){
        respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
    }
}


const loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({where: {email}});
        if(!user)
            throw new Error("user does not exists")
        if(!(await user.matchPassword(password)))
            throw new Error("passwords does not match")
        if(!user.get('verified'))
            throw new Error("user is not verified")

            respondWithJSON(res,statuses.HTTP_ACCEPTED,{
            user,
            authToken: await user.generateAuthToken()
        });

    } catch (error){
         respondWithError(res,statuses.HTTP_NOT_FOUND,error.message);
    }
}



const logout = async (req,res,next) => {
    res.cookie('jwt', '', {maxAge:1});
}

const sendMail = async(req, res) => {
    try {

        console.log("ssds")
        const confirm = await transporter.sendMail({
            from: "ALOCATOR",
            to: 'dawid1234999@gmail.com',
            text: "LUBIE ALOKOWAC MALE STERTY"
        }).

        if(confirm)
            respondWithJSON(res,statuses.HTTP_OK,"EMAIL SENT");
    
        respondWithError(res,statuses.HTTP_BAD_REQUEST,"EMAIL was not sent");
        


    } catch (error ){
         throw new Error({error: "SENDING EMAIL ERROR"})
    }
}



const verify = async (req,res) => {
    const hashStr = req.params.hash;

    console.log(hashStr);
    
    try {
        const hash = await Hash.findOne({where: {hash: hashStr}});
        if(!hash)
            throw new Error("hash is invalid");
        
        const user = await User.findOne({where: {user_id: hash.get('user_id')}});

        if(!user)
            throw new Error("no user assigned to hash");

        user.set('verified');

        await user.save();
        await hash.destroy();

    } catch (error){
         respondWithError(res,statuses.HTTP_NOT_FOUND,error.message);
    }
}


export {
    registerUser,
    loginUser,
    sendMail,
    verify
}