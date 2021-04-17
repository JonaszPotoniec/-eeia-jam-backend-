import DataTypes from "sequelize";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userInit = (db) => {
  const User = db.define("User", {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      default: ''
    },
    last_name: {
      type: DataTypes.STRING,
      default: ''
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_official: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }


  });
  
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  });

  User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  User.prototype.generateAuthToken = async function () {
    return jwt.sign({user_id: this.user_id}, '123456', {expiresIn: '1h'})
  }

  return User;
};

export default userInit;
