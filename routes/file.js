

const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/auth.js");
const upload = require("../middleware/multer.js");
const { fileSummary, fileUpload, getFiles } = require("../controllers/file.js");

router.use(verifyJWT);
router.route("/").get(getFiles);
router.route("/upload").post(upload.single("file"), fileUpload);
router.route("/summary/:fileId").post(fileSummary);

module.exports = { fileRouter: router };


