import DataTypes from 'sequelize'

const eventInit = (db) => {
    const Event =  db.define('Event',{
        event_id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            unique: true
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            defaultValue:"No description provided"
        },
        is_official:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        start_date:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        img_path:{
            type: DataTypes.STRING,
            allowNull: true,
          }
    })

    return Event;

}

export default eventInit;