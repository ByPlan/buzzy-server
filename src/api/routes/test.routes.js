import db from "../../db/models/index.js";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const uploadFile = (fileBlob, postId) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${postId}/${fileName}`,
    Body: fileBlob,
  };
  s3.upload(params, (s3Err, data) => {
    if (s3Err) throw s3Err;
    return data.Location;
  });
};

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/user", async (req, res) => {
    const User = db.User;
    const user = await User.findOne({
      where: {
        email: "heonsub6558@gmail.com",
      },
    });
    return res.json({ user: user });
  });

  app.post("/image", async (req, res) => {
    const postId = 1;
    const url = uploadFile(req.body[0], postId);
    return res.send(url);
  });
};
