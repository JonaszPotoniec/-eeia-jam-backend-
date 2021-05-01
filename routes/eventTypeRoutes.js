import {Router} from 'express'
import {getEventType, postEventType, deleteEventType, updateEventType} from '../controllers/eventTypeController.js'
import protect from '../middleware/authMiddleware.js'
const router = Router();

router
    .route('/eventTypes')
    .get(protect, getEventType)
    .post(postEventType);
    
router
    .route('/eventTypes')
    .put(updateEventType)
    .delete(deleteEventType);

export default router;