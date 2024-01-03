import { Schema, model } from "mongoose";

const commentSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  poem: {
    type: Schema.Types.ObjectId,
    ref: "Poem",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default model("Comment", commentSchema);
