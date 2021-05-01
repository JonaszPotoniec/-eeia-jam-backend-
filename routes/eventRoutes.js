import {Router} from 'express'
import {getEvent, getEventById, postEvent, deleteEvent, updateEvent,getClosestEvent, dropEvents} from '../controllers/eventController.js'
import protect from '../middleware/authMiddleware.js'
const router = Router();

router
    .route('/events')
    .get(getEvent)
    .post(postEvent);
    
router
    .route('/events/id/:id')
    .get(getEventById)
    .put(updateEvent)
    .delete(deleteEvent);

router
    .route('/events/nearest')
    .get(getClosestEvent);


export default router;    