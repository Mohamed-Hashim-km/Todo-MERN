import express from "express";
import { addTodo, deleteTodo, getTodoByID, getTodos, updateTodo } from "../controllers/todoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const routes = express.Router();

//================ We can reduce the same code
// routes.post("/",addTodo)
// routes.get("/",getTodos)

routes.route("/").get(protect,getTodos).post(protect,addTodo);

routes.route("/:id").delete(protect,deleteTodo).get(protect,getTodoByID).patch(protect,updateTodo);

// routes.delete('//:id', async (req, res) =>{
//     await Todo.findByIdAndDelete(req.params.id)
//     res.json({message: "Todo deleted successfully"})
// })

export default routes;
