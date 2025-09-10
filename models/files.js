const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    url: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    filetype: {
      type: String,
      enum: ["application/pdf", "image/jpeg", "image/png", "image/jpg"],
      required: true,
    },
    extractedText: {
      type: String,
    },
    summary: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('File',fileSchema);