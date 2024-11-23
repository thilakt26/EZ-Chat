import express from 'express';
import { allUsers, Login, Logout, signup } from '../controller/user.controller.js';
import secureRoute from '../midleware/secureRoute.js';

const router=express.Router();

router.post("/signup",signup);
router.post("/login",Login);
router.post("/logout",Logout);
router.get("/allusers",secureRoute, allUsers)

export default router;