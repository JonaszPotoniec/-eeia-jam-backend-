import express from 'express';
import {connect, User} from './db/connect.js';

const PORT = process.env.PORT || 5000;
const app = express();


app.get('/api/events', async (req, res)=> {
    try {
        const events = await User.findAll();
        res.json(events);
    } catch (err){
        res.json({"error": err.message});
    }
});


connect()
    .then(() => app.listen(PORT, ()=> console.log(`server running on port: ${PORT}`)))
    .catch(()=>process.exit(1));
