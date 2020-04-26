import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId


const Comment = new Schema(
  {
    // bugId: { type: ObjectId, ref: 'Bug', required: true },
    description: { type: String, required: true },
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Comment.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Comment;
