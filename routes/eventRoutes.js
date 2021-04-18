import {Router} from 'express'
import {getEvent, getEventById, postEvent, deleteEvent, updateEvent,getClosestEvent} from '../controllers/eventController.js'
import protect from '../middleware/passport.js'
const router = Router();

router
    .route('/events')
    .get(getEvent)
    .post(postEvent);
    
router
    .route('/events/id/:id')
    .get(getEventById)
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);

router
    .route('/events/nearest')
    .get(getClosestEvent);

export default router;    