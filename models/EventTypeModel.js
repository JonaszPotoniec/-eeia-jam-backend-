import DataTypes from "sequelize";

const eventTypeInit = (db) => {
  return db.define("event_type", {
    event_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export default eventTypeInit;
