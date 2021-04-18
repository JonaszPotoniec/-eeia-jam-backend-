import {EventType} from '../db/connect.js'
import * as statuses from './httpStatusCodes.js' 

const getEventType = async (req,res) => {
    try {
        const found = await EventType.findAll();
        respondWithJSON(res,statuses.HTTP_FOUND,found);
    } catch(error) {
        respondWithError(res,statuses.HTTP_NOT_FOUND,error.message);
    }
}

const postEventType = async (req, res) => {
    const body = req.body;
    try {
        const eventType = await EventType.create(body);
        respondWithJSON(res,statuses.HTTP_CREATED,eventType);
    } catch(error) {
        respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
    }
}

const deleteEventType = async (req, res) => {
    const id = req.params.id;
    try {
        await EventType.destroy({where: {event_type_id: id}})
        respondWithJSON(res,statuses.HTTP_ACCEPTED,{event_type_id: id});
    } catch (error){
        respondWithError(res,statuses.HTTP_NOT_FOUND,error.message);
    }
}

const updateEventType = async (req, res) => {
    try {
    const eventType = await EventType.findById(req.params.id);
    if(!eventType)
        throw new Error("User not Found");
    eventType.name = req.body.type_name || eventType.name;
    const updatedEventType = await EventType.save();

    
    respondWithJSON(res,statuses.HTTP_CREATED,updatedEventType);
    } catch(error) {
        respondWithError(res,statuses.HTTP_NOT_MODIFIED,error.message);
    }
}


export {
    getEventType,
    postEventType,
    deleteEventType,
    updateEventType
}