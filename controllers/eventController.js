import {Event, Localization} from '../db/connect.js'
import QueryTypes from 'sequelize'
import {db} from '../db/connect.js'
import * as statuses from './httpStatusCodes.js' 
import {respondWithError, respondWithJSON} from '../config/utils.js'

const getEvent = async (req, res) =>{
    try{
        const found = await Event.findAll();
        respondWithJSON(res,statuses.HTTP_FOUND,found);
    }catch(error){
        respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
    }
}

const getClosestEvent = async (req, res) =>{
    try{
        if(req.query === true && req.query.lat && req.query.lon  && req.query.dis )
            throw new Error("Invalid URL Parameters")

        const found = await db.query(
            "SELECT *, (ABS(latitude-:lat)+ABS(longitude-:lon))/111.111 as distance FROM Events as e join Localizations as l on e.localization_id = l.localization_id WHERE distance <= :dis ORDER BY distance ASC",
             {
                replacements:
                {
                    lat:req.query.lat,
                    lon:req.query.lon,
                    dis:req.query.dis
                },     
                type: QueryTypes.SELECT, 
            });
        respondWithJSON(res,statuses.HTTP_FOUND,found[0]);
    }catch(error){
        respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
    }
}

const postEvent = async(req,res)=>{
    try{
        const localization = await Localization.create(req.body);
        let event = await Event.create({...req.body, localization_id: localization.localization_id});
        event.localization_id = localization.localization_id;
        await event.save();
        respondWithJSON(res,statuses.HTTP_CREATED,event);
    }catch(error){
        respondWithError(res,statuses.HTTP_BAD_REQUEST,error.message);
    }
}

const deleteEvent = async (req, res) => {
    const id = req.params.id;
    try {
        await Event.destroy({where: {id}})
        respondWithJSON(res,statuses.HTTP_ACCEPTED,{event_id: id});
    } catch (error){
        try {
        respondWithError(res,statuses.HTTP_NOT_FOUND,error.message);
        } catch(error) {
            console.log(error.message)
        }
    }
}

const updateEvent = async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findById(id);
        if(!event)
            throw new Error("Event not found");
            
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.is_official = req.body.is_official || event.is_official;
        event.start_date = req.body.start_date || event.start_date;
        
        const updatedEvent = event.save();
        respondWithJSON(res,statuses.HTTP_ACCEPTED,updatedEvent);
    } catch (error){
        respondWithError(res,statuses.HTTP_NOT_FOUND,error.message);
    }
}
const getEventById  = async (req, res) => {
    const id = req.params.id;
    try{
        const found = Event.findByPk(id);
        respondWithJSON(res,statuses.HTTP_ACCEPTED,found);
    }catch(error){
        respondWithError(res,statuses.HTTP_NOT_FOUND,error.message);
    }
}

export {
    getEvent,
    getEventById,
    postEvent,
    updateEvent,
    deleteEvent,
    getClosestEvent
}