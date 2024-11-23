import express from 'express';
import { sendMessage,getMessage } from '../controller/message.controller.js';
import secureRoute from '../midleware/secureRoute.js';

const router=express.Router();

// to send and store the msg in DB
router.post("/send/:id",secureRoute, sendMessage);
router.get("/get/:id",secureRoute, getMessage);

export default router;