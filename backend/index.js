import express from "express";
import conncetDb from "./config/db.js";
// import Todo from "./models/todoModel.js";
import routes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notfound } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

dotenv.config();    //dotenv package//


conncetDb();
const app = express();

// ================MiddleWare==============//
// front end json formate request middle ware will convert notmal object formate then that object go to app.use("/api/todo", routes);
app.use(express.json());
// =====================================//
app.use(cookieParser());    //convert cookie normal formate



const port = process.env.PORT

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/todo", routes);
app.use("/api/users", userRoutes);

app.use(notfound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// install nodemen package
