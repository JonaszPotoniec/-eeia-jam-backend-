import express from 'express';
import {connect, User} from './db/connect.js';
import eventsRoutes from './routes/eventRoutes.js'
import localizationRoutes from './routes/localizationRoutes.js'
import userRoutes from './routes/userRoutes.js'
import eventTypeRoutes from './routes/eventTypeRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import cp from 'cookie-parser'
import path from 'path'
import expressValidator from 'express-validator'
import uploadRoutes from './routes/uploadRoutes.js'

const PORT = process.env.PORT || 5000;
const app = express();


app.use(expressValidator());
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(localizationRoutes);
app.use(eventsRoutes);
app.use(eventTypeRoutes);
app.use(authRoutes);
app.use(uploadRoutes);
app.use(cp());

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.get('/', (req,res)=>{
    res.send("JONASZ PAJTONIEC JONASZ PAJTONIEC")
})

connect()
    .then(() => app.listen(PORT, ()=> console.log(`server running on port: ${PORT}`)))
    .catch(()=>process.exit(1));