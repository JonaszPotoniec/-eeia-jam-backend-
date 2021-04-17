import {Router} from 'express'
import {getEventType, postEventType, deleteEventType, updateEventType} from '../controllers/eventTypeController.js'

const router = Router();

router
    .route('/eventTypes')
    .get(getEventType)
    .post(postEventType);
    
router
    .route('/eventTypes')
    .put(updateEventType)
    .delete(deleteEventType);

export default router;