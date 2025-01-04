import Todo from "../models/todoModel.js";

const addTodo = async (req, res) => {
  // middleware  //

  const { title, desc } = req.body;
  //    =================  //

  const todo = await Todo.create({
    title,
    desc,
    user: req.user._id,
  });
  console.log(todo);
  
  res.json(todo);
};

const getTodos = async (req, res) => {
  const todos = await Todo.find({user: req.user._id });
  res.json(todos);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  await Todo.findByIdAndDelete(id);

  res.send("deleted successfully");
};

const getTodoByID = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);

  res.json(todo);
};

const updateTodo = async (req, res) => {
  //========== middleware============  //
  const { title, desc, status } = req.body;
  //    =================  //

  const { id } = req.params;

  const todo = await Todo.findById(id);

  todo.title = title || todo.title;
  todo.desc = desc || todo.desc;
  todo.status = status || todo.status;

  const updatedTodo = await todo.save(); //for save db

  res.json(updatedTodo);
};

export { addTodo, getTodos, deleteTodo, getTodoByID, updateTodo };
