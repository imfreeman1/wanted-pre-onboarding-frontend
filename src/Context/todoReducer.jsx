import { TODO_ACTION } from "./action";
import { v4 } from "uuid";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTION.ADD:
      const newId = v4();
      const newTodo = {
        id: newId,
        content: action.payload,
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
    default:
      throw new Error(console.error);
  }
};
