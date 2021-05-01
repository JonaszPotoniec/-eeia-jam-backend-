import DataTypes from "sequelize";
import {Event} from '../db/connect.js';

const localizationInit = (db) => {
  const Localization = db.define("Localization", {
    localization_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
  return Localization;
};

export default localizationInit;
