import {Router} from 'express'
import {getEvent, getEventById, postEvent, deleteEvent, updateEvent} from '../controllers/eventController.js'

const router = Router();

router
    .route('/events')
    .get(getEvent)
    .post(postEvent);
    
router
    .route('/events/:id')
    .get(getEventById)
    .put(updateEvent)
    .delete(deleteEvent);


export default router;    