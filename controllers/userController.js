import {User} from '../db/connect.js'
import * as statuses from './httpStatusCodes.js'

const getUser = async (req,res) => {
    try {
        const found = await User.findAll();
        res.status(statuses.HTTP_FOUND).json(found);
    } catch(error) {
        res.status(statuses.HTTP_NOT_FOUND).json({error: error.message});
    }
}

const postUser = async (req, res) => {
    const body = req.body;
    try {
        const user = await User.create(body);
        res.status(201).json(user);
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.destroy({where: {user_id: id}})
        res.status(202).json({user_id: id});
    } catch (error){
        res.status(400).json({error: error.message});
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

    res.status(202).json(updatedUser)
    } catch(error) {
        res.status(status.HTTP_NOT_MODIFIED).json({error: error.message});
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const found = await User.findByPk(id);
        res.json(found)
    } catch(error) {
        res.status(400).json({error: "error"})
    }
}

export {
    getUser,
    getUserById,
    postUser,
    updateUser,
    deleteUser
}