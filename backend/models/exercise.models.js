const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    startDate: { type: String, require: true, default: new Date("YYYY-MM-DD") },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    participants: [{ type: ObjectId, ref: "User" }],
  },
  {
    timestamp: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
