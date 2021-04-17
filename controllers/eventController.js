import {Event} from '../db/connect.js'
import QueryTypes from 'sequelize'

const getEvent = async (req, res) =>{
    try{
        const found = await Event.findAll();
        res.json(found);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const getClosestEvent = async (req, res) =>{
    try{
        const found = await Event.query(
            "SELECT * FROM events as e join localization as l on e.localization_id = l.localization_id " + 
            "where ABS(l.longitude - :lon) <= :dis AND ABS(l.latitude - :lat) <= :dis",
             {
                replacements:
                {
                    lat:req.body.latitude,
                    lon:req.body.longitude,
                    dis:req.body.distance
                },     
                type: QueryTypes.SELECT 
            });
        res.json(found);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const postEvent = async(req,res)=>{
    try{
        console.log(req.body)
        const event = await Event.create(req.body);
        res.status(201).json(event);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteEvent = async (req, res) => {
    const id = req.params.id;
    try {
        await Event.destroy({where: {id}})
        res.status(202).json({event_id: id});
    } catch (error){
        res.status(404).json({error: error.message});
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
        res.status(202).json({
            id: updatedEvent.id,
            title: updatedEvent.title,
            description:updatedEvent.description,
            is_official:updatedEvent.is_official,
            start_date:updatedEvent.start_date
        });
    } catch (error){
        res.status(404).json({error: error.message});
    }
}
const getEventById  = async (req, res) => {
    const id = req.params.id;
    try{
        const found = Event.findByPk(id);
        res.json(found);
    }catch(error){
        res.status(404).json({error: error.message});
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