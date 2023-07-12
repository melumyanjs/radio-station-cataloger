const sequelize = require('../config/db');
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: { type: DataTypes.STRING, unique: true },
  //email: {type: DataTypes.STRING, unique: true},
  password: { type: DataTypes.STRING },
});

const Token = sequelize.define("token", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  refreshToken: { type: DataTypes.STRING, require: true },
});

const Role = sequelize.define("role", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: { type: DataTypes.STRING },
});

User.hasOne(Token)
Token.belongsTo(User)
Role.hasOne(User)
User.belongsTo(Role)

module.exports = { User, Token, Role };
