const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const participantsSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    meeting: [
      {
        startTime: { type: String },
        endTime: { type: String },
        date: { type: String },
        Id: { type: ObjectId },
      },
    ],
  },
  {
    timestamp: true,
  }
);

const Participants = mongoose.model("Participants", participantsSchema);

module.exports = Participants;
