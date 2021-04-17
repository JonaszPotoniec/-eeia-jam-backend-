import { Sequelize } from 'sequelize'
import userInit from '../models/UserModel.js';
// import Localization from '../models/LocalizationModel.js';
// import Event from '../models/EventModel.js'
// import EventType from '../models/EventTypeModel.js'
// import Localization from '../models/LocalizationModel.js'

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});


const User = userInit(db);

const connect = async () => {
    try {

        await db.authenticate();
        await db.sync();

        const u = await User.create({
            name: "Dawid",
            password: "skorpion1",
            last_name: "Góra",
            email: "dawid12349@interia.pl",
            verified: true,
        })
         await u.save();


        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {connect, User};