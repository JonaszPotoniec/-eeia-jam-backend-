import { Sequelize } from 'sequelize'
import userInit from '../models/UserModel.js';
import localizationInit from '../models/LocalizationModel.js';
import eventInit from '../models/EventModel.js'
import eventTypeInit from '../models/EventTypeModel.js'

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});


const User = userInit(db);
const Localization = localizationInit(db);
const Event = eventInit(db);
const EventType = eventTypeInit(db);

const connect = async () => {
    try {

        await db.authenticate();
        await db.sync();

        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {connect, User, Localization, Event, EventType};