"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      models.Group.belongsToMany(models.User, {
        through: "UserGroups",
        as: "users",
        foreignKey: "groupId",
      });
      models.Group.belongsToMany(models.Flower, {
        through: "GroupFlowers",
        as: "flowers",
        foreignKey: "groupId",
      });
      models.Group.belongsToMany(models.Tag, {
        through: "GroupTags",
        as: "tags",
        foreignKey: "groupId",
      });
      models.Group.hasMany(models.Meeting, {
        foreignKey: "groupId",
      });
      models.Group.hasMany(models.Place, {
        foreignKey: "groupId",
      });
    }
  }
  Group.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      userNumber: DataTypes.INTEGER,
      groupCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
