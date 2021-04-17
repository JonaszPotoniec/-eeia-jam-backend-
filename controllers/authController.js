import {User} from '../db/connect.js'

const registerUser = async (req,res) => {
    const { email, password , name, last_name} = req.body
    try{
        let user = await User.findOne({where: {email: email}});
        if(user)
            throw new Error('this email is already in use');

        user = await User.create({email, password, name, last_name});
        if(!user)
            throw new Error("Wrong form data");

        user.save();
        res.status(200).json({
            user,
            authToken: await user.generateAuthToken(),
        });
    }catch(error){
        res.status(400).json({error: error.message});
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

        res.json({
            user,
            authToken: await user.generateAuthToken()
        });

    } catch (error){
        res.status(404).json({error: error.message});
    }
}


export {
    registerUser,
    loginUser,
}