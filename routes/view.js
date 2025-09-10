const express = require("express");
const router = express.Router();
const File = require("../models/files"); 
const verifyJWT = require("../middleware/auth");


router.get("/", (req, res) => {
  res.render("login");
});
// Render registration page
router.get("/register", (req, res) => {
  res.render("register");
});

// Render dashboard with files
router.get("/dashboard", verifyJWT, async (req, res) => {
  const files = await File.find({ owner: req.user._id });
  res.render("dashboard", { user: req.user, files });
});

// // Render summary page
// router.get("/files/summary/:fileId", verifyJWT, async (req, res) => {
//   const file = await File.findById(req.params.fileId);
//   if (!file || file.owner._id.toString() !== req.user._id.toString()) {
//     return res.status(403).send("Unauthorized");
//   }

//   if (!file.summary) {
//     return res.send("Summary not generated yet.");
//   }

//   res.render("summary", { summary: file.summary });
// });

const axios = require('axios');  // npm install axios if not installed

router.post("/files/summary/:fileId", verifyJWT, async (req, res) => {
  try {
    const fileId = req.params.fileId;

    // Call the summary API with user's access token (assumed stored in req.cookies.accessToken)
    const accessToken = req.cookies.accessToken;
    
console.log(accessToken);
    if (!accessToken) {
      return res.status(401).send("Unauthorized - no access token");
    }

   const response = await axios.post(
  `${process.env.API_BASE_URL || 'http://localhost:5000'}/api/files/summary/${fileId}`,
  {
    length: "short"
  },
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'  // important to add for JSON body
    }
  }
);

    const summary = response.data.data;  

    if (!summary) {
      return res.send("Summary not generated yet.");
    }

    res.render("summary", { summary });
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return res.status(403).send("Unauthorized");
    }
    //console.log(error);
    res.status(500).send("Something went wrong");
  }
});


module.exports = router;
