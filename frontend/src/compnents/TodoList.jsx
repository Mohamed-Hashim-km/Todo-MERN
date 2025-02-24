import axios from 'axios';
import React, { useState } from 'react'
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteTodoMutation, useEditTodoMutation } from '../slices/todoApiSlice';
const TodoList = ({ todos}) => {



   
   const [deleteTodo]=useDeleteTodoMutation()

   const [editTodo]=useEditTodoMutation()

  const deleteHandler=async(id)=>{
   
    try {
      await deleteTodo(id)
    // console.log(id);
    // await axios.delete(`/api/todo/${id}`)
    // getTodoHandler()
    toast.success("Deleted")
      
    } catch (error) {
     toast.error(error.data.message) 
    }

    
  }



  const CompleteHandler=async(id)=>{
    console.log(id);
    
   await editTodo({status:"completed",id})
    // await axios.patch(`/api/todo/${id}`,{status:"completed"})
    // getTodoHandler()
    
  }
 
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Your Todos
      </h2>
      {todos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo, index) => (
            <div
              key={index}
              className={`p-5 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow ${
                todo.status === "completed" ? "opacity-70" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className={`text-xl font-bold ${
                      todo.status === "completed"
                        ? "text-gray-500 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </h3>
                  <p
                    className={`mt-2 ${
                      todo.status === "completed"
                        ? "text-gray-400 line-through"
                        : "text-gray-600"
                    }`}
                  >
                    {todo.desc}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={()=>CompleteHandler(todo._id)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                    aria-label="Mark as Completed"
                  >
                    <FaCheckCircle />
                  </button>
                  <Link to={`/update/${todo._id}`}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    aria-label="Edit Todo"
                  >
                    <FaEdit />
                  </Link>
                  <button type='button' onClick={()=>deleteHandler(todo._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    aria-label="Delete Todo"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No todos yet. Start by adding one!
        </p>
      )}
    </div>
  );
}

export default TodoList