
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler.js');
const ApiError = require('../utils/apiError.js');
const ApiResponse = require('../utils/apiResponse.js');
const File = require('../models/files.js');
const uploadOnCloudinary = require('../utils/cloudinary.js');
const extractText = require('../utils/extractText.js');
const generateSummaryHuggingFace = require('../utils/generateSummary.js');


module.exports.fileUpload = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user id");
  }
  if (!req.file) {
    throw new ApiError(400, "File not provided");
  }
  const fileLocalPath = req?.file?.path;
  const filetype = req?.file?.mimetype;
  if (
    !["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(
      filetype
    )
  ) {
    throw new ApiError(400, "Invalid file type");
  }
  const extractedText = await extractText(fileLocalPath, filetype);
  if (!extractedText) {
    throw new ApiError(400, "File not extracted");
  }

  const file = await uploadOnCloudinary(fileLocalPath);
  if (!file) {
    throw new ApiError(400, "File not uploaded");
  }
  const newFile = await File.create({
    url: file?.url,
    owner: req.user,
    filetype,
    extractedText,
  });
  if (!newFile) {
    throw new ApiError(400, "File not created");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, newFile, "File uploaded successfully!"));
});

module.exports.fileSummary = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  const { length } = req.body;
  if (!mongoose.Types.ObjectId.isValid(fileId)) {
    throw new ApiError(400, "Invalid file id");
  }
  const file = await File.findById(fileId);
  if (!file) {
    throw new ApiError(404, "File not found");
  }
  if (file.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to access this file");
  }
  const summary = await generateSummaryHuggingFace(file.extractedText, length);
  if (!summary) {
    throw new ApiError(400, "File not summarized");
  }
  file.summary = summary;
  await file.save();
  return res
    .status(200)
    .json(
      new ApiResponse(200, summary, "File summary generated successfully!")
    );
});
