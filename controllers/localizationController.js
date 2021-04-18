import {Localization} from '../db/connect.js'
import * as statuses from './httpStatusCodes.js' 
import {respondWithError, respondWithJSON} from '../config/utils.js'

const getLocalization = async (req, res) =>{
    try{
        const found = await Localization.findAll();
        respondWithJSON(res,statuses.HTTP_FOUND,found);
    }catch(error){
        respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
    }
}

const getLocalizationById = async (req, res) =>{
    const id = req.params.id
    try{
        const found = await Localization.findByPk(id);
        respondWithJSON(res,statuses.HTTP_FOUND,found);
    }catch(error){
        respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
    }
}

const postLocalization = async(req,res)=>{
    try{
        const localization = await Localization.create(req.body);
        respondWithJSON(res,statuses.HTTP_CREATED,localization);
    }catch(error){
        respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
    }
}

const deleteLocalization = async (req, res) => {
    const id = req.params.id;
    try {
        await Localization.destroy({where: {id}})
        respondWithJSON(res,statuses.HTTP_ACCEPTED,{localization_id:id});
    } catch (error){
        respondWithError(res,statuses.HTTP_NOT_FOUND,error.message);
    }
}

const updateLocalization = async(req,res)=>{
    const id = req.params.id;
    try{
        const localization = await Localization.findById(id);
        if(!localization)
            throw new Error("Localization not found");
        localization.latitude = req.body.latitude || localization.latitude;
        localization.longitude = req.body.longitude || localization.longitude;

        const updatedLocalization = await Localization.save();
        
        respondWithJSON(res,statuses.HTTP_CREATED,updatedLocalization);
    }catch(error){
        respondWithError(res,statuses.HTTP_NOT_MODIFIED,error.message);
    }
}



export {
    getLocalization,
    getLocalizationById,
    postLocalization,
    deleteLocalization,
    updateLocalization,
}