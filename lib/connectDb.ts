import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "Blog_Application",
    });
  } catch (error) {
    process.exit(1);
  }
};

export default connectDb;
