import { connect } from "mongoose";

export const connectToDatabase = async () => {
  try {
    await connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DATABASE}.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch (err) {
    console.log(err);
    return err;
  }
};
