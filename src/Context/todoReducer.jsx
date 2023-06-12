import { TODO_ACTION } from "./action";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTION.ADD:
      const newTodo = {
        id: action.payload.id,
        content: action.payload.content,
        isCompleted: false,
      };
      state = [...state, newTodo];
      return state;
    case TODO_ACTION.REMOVE:
      state = state.filter(({ id }) => id !== action.payload);
      return state;
    case TODO_ACTION.MODIFY:
      state = state.map((todo) => {
        if (todo.id === action.payload.id) return action.payload;
        return todo;
      });
      return state;
    case TODO_ACTION.CHECK:
      state = state.map((todo) => {
        if (todo.id === action.payload.id) return action.payload;
        return todo;
      });
      return state;
    case TODO_ACTION.GET:
      state = action.payload.map(({ id, todo, isCompleted }) => {
        return {
          id,
          content: todo,
          isCompleted,
        };
      });
      return state;
    default:
      throw new Error(console.error);
  }
};
