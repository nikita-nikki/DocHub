

const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/auth.js');
const upload = require('../middleware/multer.js');
const { fileSummary, fileUpload } = require("../controllers/file.js");


router.use(verifyJWT);
router.route("/upload").post(upload.single("file"), fileUpload);
router.route("/summary/:fileId").get(fileSummary);

module.exports = { fileRouter: router };
