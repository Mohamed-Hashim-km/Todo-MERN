import mongoose from "mongoose";

const conncetDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDb connected: ${conn.connection.host}`)
};

export default conncetDb;
