import {registerUser, loginUser, verify, logout} from '../controllers/authController.js'
import Router from 'express'
const router = new Router();


router
    .route("/login")
    .post(loginUser);

router
    .route("/register")
    .post(registerUser)

router
    .route("/logout")
    .get(logout)

router
    .route('/verify/:hash')
    .get(verify)


export default router;