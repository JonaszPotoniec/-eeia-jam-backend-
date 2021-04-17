import {Localization} from '../db/connect.js'
import * as statuses from './httpStatusCodes.js' 

const getLocalization = async (req, res) =>{
    try{
        const found = await Localization.findAll();
        res.json(found);
    }catch(error){
        res.status(statuses.HTTP_BAD_REQUEST).json({error: error.message});
    }
}

const getLocalizationById = async (req, res) =>{
    const id = req.params.id
    try{
        const found = await Localization.findByPk(id);
        res.json(found);
    }catch(error){
        res.status(statuses.HTTP_BAD_REQUEST).json({error: error.message});
    }
}

const postLocalization = async(req,res)=>{
    try{
        const localization = await Localization.create(req.body);
        res.status(statuses.HTTP_ACCEPTED).json(localization);
    }catch(error){
        res.status(statuses.HTTP_BAD_REQUEST).json({error: error.message});
    }
}

const deleteLocalization = async (req, res) => {
    const id = req.params.id;
    try {
        await Localization.destroy({where: {id}})
        res.status(statuses.HTTP_ACCEPTED).json({localization_id: id});
    } catch (error){
        res.status(statuses.HTTP_NOT_FOUND).json({error: error.message});
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
        
        res.status(statuses.HTTP_ACCEPTED).json(updateLocalization);

    }catch(error){
        res.status(statuses.HTTP_NOT_MODIFIED).json({error: error.message});
    }
}



export {
    getLocalization,
    getLocalizationById,
    postLocalization,
    deleteLocalization,
    updateLocalization,
}