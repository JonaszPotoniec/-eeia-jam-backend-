import {User} from '../db/connect.js'
import * as statuses from './httpStatusCodes.js'
import {respondWithError, respondWithJSON} from '../config/utils.js'

const getUser = async (req,res) => {
    try {
        const found = await User.findAll();
        respondWithJSON(res,statuses.HTTP_FOUND,found);
    } catch(error) {
        respondWithError(res,statuses.HTTP_NOT_FOUND,error.message);
    }
}

const postUser = async (req, res) => {
    const body = req.body;
    try {
        const user = await User.create(body);
        respondWithJSON(res,statuses.HTTP_CREATED,user);
    } catch(error) {
        respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.destroy({where: {user_id: id}})
        respondWithJSON(res,statuses.HTTP_ACCEPTED,{user_id: id});
    } catch (error){
        respondWithError(res,statuses.HTTP_NOT_MODIFIED,error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            throw new Error("User not Found");
        user.name = req.body.name || user.name;
        user.last_name = req.body.last_name || user.last_name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.passoword;
        user.is_valid = req.body.is_valid || user.is_valid;
        user.is_official = req.body.is_official || user.is_official;

        const updatedUser = await User.save();

        respondWithJSON(res,statuses.HTTP_ACCEPTED,updatedUser);
    } catch(error) {
        respondWithError(res,statuses.HTTP_NOT_MODIFIED,error.message);
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const found = await User.findByPk(id);
        respondWithJSON(res,statuses.HTTP_FOUND,found);
    } catch(error) {
        respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
    }
}

export {
    getUser,
    getUserById,
    postUser,
    updateUser,
    deleteUser
}