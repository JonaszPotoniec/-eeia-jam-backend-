import {Router} from 'express'
import {getLocalization, getLocalizationById, postLocalization, deleteLocalization, updateLocalization} from '../controllers/localizationController.js'

const router = Router();

router
    .route('/localizations')
    .get(getLocalization)
    .post(postLocalization);
    
router
    .route('/localizations/:id')
    .get(getLocalizationById)
    .put(updateLocalization)
    .delete(deleteLocalization);

export default router;