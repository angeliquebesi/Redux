import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Data {
  id: number;
  title: string;
  completed: boolean;
}

export type Todo = Data;

function transformDataToTodo(data: Data): Todo {
  return {
    id: data.id,
    title: data.title,
    completed: data.completed,
  };
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  tagTypes: ["Todo"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/posts",
        method: "POST",
        body: JSON.stringify({
          title: todo.title,
          body: todo.body,
          id: todo.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: (result) => result ? [{ type: "Todo", id: result.id }, { type: "Todo", id: "LIST" }] : []
    }),
    getAllTodos: builder.query({
      query: () => "/posts",
      providesTags: [{ type: "Todo", id: "LIST" }]

    }),
    getTodoById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result) => result ? [{ type: "Todo", id: result.id }] : []
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: JSON.stringify({
          title: todo.title,
          body: todo.body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const getTodoByIdPatch = dispatch(
          todoApi.util.updateQueryData("getTodoById", id, (draft) => {
            Object.assign(draft, data)
          })
        )
        const getAllTodosPatch = dispatch(
          todoApi.util.updateQueryData("getAllTodos", undefined, (draft) => {
            const todoIndex = draft.findIndex((todo: Data) => todo.id === id)
            if (todoIndex > -1) {
              const todoData = transformDataToTodo(data);
              Object.assign(draft[todoIndex], todoData)
            }
          })
        )
        try {
          await queryFulfilled;
        } catch {
          getAllTodosPatch.undo()
          getTodoByIdPatch.undo()
        }
      },
      invalidatesTags: (result) => result ? [{ type: "Todo", id: result.id }] : []

    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    })

  })
})

export const {
  useAddTodoMutation,
  useGetAllTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi