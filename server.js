import express from 'express';
import {connect, User} from './db/connect.js';
import eventsRoutes from './routes/eventRoutes.js'
import localizationRoutes from './routes/localizationRoutes.js'
import userRoutes from './routes/userRoutes.js'
import eventTypeRoutes from './routes/eventTypeRoutes.js'
import authRoutes from './routes/authRoutes.js'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(localizationRoutes);
app.use(eventsRoutes);
app.use(eventTypeRoutes);
app.use(authRoutes);


app.get('/', (req,res)=>{
    res.send("welcum!")
})

connect()
    .then(() => app.listen(PORT, ()=> console.log(`server running on port: ${PORT}`)))
    .catch(()=>process.exit(1));
