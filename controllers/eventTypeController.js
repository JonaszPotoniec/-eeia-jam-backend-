import {EventType} from '../db/connect.js'

const getEventType = async (req,res) => {
    try {
        const found = await EventType.findAll();
        res.status(statuses.HTTP_FOUND).json(found);
    } catch(error) {
        res.status(statuses.HTTP_NOT_FOUND).json({error: error.message});
    }
}

const postEventType = async (req, res) => {
    const body = req.body;
    try {
        const eventType = await EventType.create(body);
        res.status(201).json(eventType);
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteEventType = async (req, res) => {
    const id = req.params.id;
    try {
        await EventType.destroy({where: {event_type_id: id}})
        res.status(202).json({event_type_id: id});
    } catch (error){
        res.status(400).json({error: error.message});
    }
}

const updateEventType = async (req, res) => {
    try {
    const eventType = await EventType.findById(req.params.id);
    if(!eventType)
        throw new Error("User not Found");
    eventType.name = req.body.type_name || eventType.name;

    const updatedEventType = await EventType.save();

    res.status(202).json(updatedEventType)
    } catch(error) {
        res.status(status.HTTP_NOT_MODIFIED).json({error: error.message});
    }
}


export {
    getEventType,
    postEventType,
    deleteEventType,
    updateEventType
}