import db from "../db/models/index.js";

export default class UserService {
  async readUser(userId) {
    const userRecord = await db.User.findByPk(userId);
    if (!userRecord) {
      throw new Error("User not found!");
    }
    return userRecord;
  }

  async updateUser(userId, userDTO) {
    const userRecord = await db.User.update(
      { name: userDTO.name },
      { where: { id: userId } }
    );
    if (!userRecord) {
      throw new Error("User not found!");
    }
    return userRecord;
  }

  async deleteUser(userId) {
    await db.User.destroy({
      where: {
        id: userId,
      },
    });
    return;
  }

  async findGroups(userId) {
    const userRecord = await db.User.findByPk(userId);
    const groups = await userRecord.getGroups();
    const groupRecord = [];
    if (!groups) {
      throw new Error("Group not found!");
    }
    for (const group of groups) {
      await db.Group.findOne({
        where: {
          id: group.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: db.User,
          as: "users",
          attributes: ["name"],
        },
      }).then((group) => {
        groupRecord.push(group);
      });
    }

    return groupRecord;
  }

  async findMeetings(userId) {
    const userRecord = await db.User.findByPk(userId);
    const meetings = await userRecord.getMeetings();
    const meetingRecord = [];
    if (!meetings) {
      throw new Error("Meeting not found!");
    }
    for (const meeting of meetings) {
      await db.Meeting.findOne({
        where: {
          id: meeting.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: db.User,
          as: "users",
          attributes: ["name"],
        },
      }).then((meeting) => {
        meetingRecord.push(meeting);
      });
    }
    return meetingRecord;
  }
}
