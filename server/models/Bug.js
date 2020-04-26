import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Bug = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    closed: { type: Boolean, required: true, default: false },
    closedDate: { type: Date},
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Bug.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Bug;
