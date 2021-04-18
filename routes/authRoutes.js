import {registerUser, loginUser, verify} from '../controllers/authController.js'
import Router from 'express'
const router = new Router();


router
    .route("/login")
    .post(loginUser);

router
    .route("/register")
    .post(registerUser)

router
    .route('/verify/:hash')
    .get(verify)


export default router;