import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Note = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Note.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Note;
