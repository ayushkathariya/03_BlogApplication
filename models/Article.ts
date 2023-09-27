import { Schema, model, models } from "mongoose";

const articleSchema = new Schema(
  {
    caption: {
      type: String,
      required: [true, "Content is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.Article || model("Article", articleSchema);
