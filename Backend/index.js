import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.route.js';
import {app,server} from './SocketIO/server.js';



// const app = express()

dotenv.config();
const PORT=process.env.PORT||3001;
const URI=process.env.MONGODB_URI;

//middle ware
app.use(express.json());
app.use(cookieParser())

app.use(cors());

//db connectivity code

try{
    mongoose.connect(URI);
    console.log("conected to MongoDB")
}
catch(e){
    console.log(e);
    
}

//route 
app.use("/api/user",userRoute);
app.use("/api/message",messageRoute);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})