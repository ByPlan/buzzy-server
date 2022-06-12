"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Meeting extends Model {
    static associate(models) {
      models.Meeting.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
      models.Meeting.belongsToMany(models.Activity, {
        through: "MeetingActivities",
        as: "activities",
        foreignKey: "meetingId",
      });
      models.Meeting.belongsToMany(models.User, {
        through: "UserMeetings",
        as: "users",
        foreignKey: "meetingId",
      });
      models.Meeting.belongsToMany(models.Question, {
        through: "MeetingQuestions",
        as: "questions",
        foreignKey: "meetingId",
      });
      models.Meeting.belongsToMany(models.Tag, {
        through: "MeetingTags",
        as: "tags",
        foreignKey: "meetingId",
      });
      models.Meeting.belongsTo(models.Flower, {
        foreignKey: "flowerId",
      });
      models.Meeting.hasMany(models.Place, {
        foreignKey: "meetingId",
      });
      models.Meeting.hasMany(models.Post, {
        foreignKey: "meetingId",
      });
      models.Meeting.hasMany(models.Comment, {
        foreignKey: "meetingId",
      });
    }
  }
  Meeting.init(
    {
      title: DataTypes.STRING,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      allDay: DataTypes.BOOLEAN,
      tagNumber: DataTypes.INTEGER,
      postNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Meeting",
    }
  );
  return Meeting;
};
