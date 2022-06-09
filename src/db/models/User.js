"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.belongsToMany(models.Group, {
        through: "UserGroups",
        as: "groups",
        foreignKey: "userId",
      });
      models.User.belongsToMany(models.Role, {
        through: "UserRoles",
        as: "roles",
        foreignKey: "userId",
      });
      models.User.belongsToMany(models.Meeting, {
        through: "UserMeetings",
        as: "meetings",
        foreignKey: "userId",
      });
      models.User.belongsToMany(models.Tag, {
        through: "UserTags",
        as: "tags",
        primaryKey: "userId",
      });
      models.User.hasMany(models.Post, {
        foreignKey: "userId",
      });
      models.User.hasMany(models.Answer, {
        foreignKey: "userId",
      });
      models.User.hasMany(models.Image, {
        foreignKey: "userId",
      });
      models.User.hasMany(models.Comment, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
