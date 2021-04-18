import { Sequelize } from 'sequelize'
import userInit from '../models/UserModel.js';
import localizationInit from '../models/LocalizationModel.js';
import eventInit from '../models/EventModel.js'
import eventTypeInit from '../models/EventTypeModel.js'
import hashInit from '../models/HashModel.js'

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});


const User = userInit(db);
const Localization = localizationInit(db);
const Event = eventInit(db);
const EventType = eventTypeInit(db);
const Hash = hashInit(db);

Localization.hasMany(Event, { foreignKey: "localization_id" });
Event.belongsTo(Localization, { foreignKey: "localization_id" });

User.hasMany(Event, { foreignKey: "user_id" });
Event.belongsTo(User, { foreignKey: "user_id" });

Event.belongsTo(EventType, { foreignKey: "event_type_id" });
EventType.hasMany(Event, { foreignKey: "event_type_id" });

User.hasOne(Hash, {foreignKey: "user_id"});
Hash.belongsTo(User, {foreignKey: "user_id"});

const connect = async () => {
    try {

        await db.authenticate();
        await db.sync();

        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {db, connect, User, Localization, Event, EventType, Hash};