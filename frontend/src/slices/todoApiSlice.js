import { apiSlice } from "./apiSlice";

const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => ({
        url: "/api/todo",
      }),
      providesTags: ["Todo"],
    }),
    getSingleTodos: build.query({
      query: (id) => ({
        url: `/api/todo/${id}`,
      }),
      providesTags: ["Todo"],
    }),
    getTodo: build.mutation({
      query: (data) => ({
        url: "/api/todo",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/api/todo/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todo"],
    }),
    editTodo: build.mutation({
      query: (data) => ({
        url: `/api/todo/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
  
});

export const { useGetTodosQuery, useGetTodoMutation,useDeleteTodoMutation,useEditTodoMutation,useGetSingleTodosQuery} = todoApiSlice;
