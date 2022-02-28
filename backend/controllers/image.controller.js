const express = require("express");
const router = express.Router();
const imageService = require("../service/image.service");
const multer = require("multer");
const User = require("../models/users.model");
const cloudinary = require("../config/imageUpload");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const uploads = multer({ storage, fileFilter });

// ---------------------------------------------UPLOAD USER AVATAR--------------------------------------------------
router.post("/", uploads.single("profile"), async (req, res) => {
  console.log("user", req.body);
  console.log("file", req.file);

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user._id}_profile`,
      width: 500,
      height: 500,
      crop: "fill",
    });
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { avatar: result.url },
      { new: true }
    );
    res
      .status(201)
      .json({ success: true, message: "Your profile has updated!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error, try after some time" });
    console.log("Error while uploading profile image", error.message);
  }
});

module.exports = router;
