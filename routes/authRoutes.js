import {registerUser, loginUser} from '../controllers/authController.js'
import Router from 'express'
const router = new Router();


router
    .route("/login")
    .post(loginUser);

router
    .route("/register")
    .post(registerUser)


export default router;