import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Conneted To Mongodb Database ${connect.connection.host}`);
  } catch (err) {
    console.log(`Errro in Mongodb ${err}`);
  }
};
export default connectDatabase;
