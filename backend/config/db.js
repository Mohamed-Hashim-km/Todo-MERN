import mongoose from "mongoose";

const conncetDb = async () => {
  const conn = await mongoose.connect("mongodb+srv://connecthashimkm:hashimhx@cluster0.tzdbj.mongodb.net/");
  console.log(`MongoDb connected: ${conn.connection.host}`)
};

export default conncetDb;
