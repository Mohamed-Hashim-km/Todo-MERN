import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type:   String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending","completed"],      //we can store only inside the enum values , even we cant store accidently a another value
    required: true,
    default: "pending",
  },
   //for specefic user to id store
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
