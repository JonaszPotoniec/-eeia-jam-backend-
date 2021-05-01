import {Router} from 'express'
import {getUser, postUser,deleteUser,updateUser,getUserById} from  '../controllers/userController.js'
const router = Router();

router
    .route('/users')
    .get(getUser)
    .post(postUser);
    
router
    .route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default router;