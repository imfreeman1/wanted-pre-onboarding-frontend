import { SIGN_ACTION } from "./action";

export const signReducer = (state, action) => {
  switch (action.type) {
    case SIGN_ACTION.EMAIL:
      state = { ...state, email: action.payload.email, isSubmitting: false };
      if (state.email.includes("@") && state.password.length >= 8) {
        state.isSubmitting = true;
        return state;
      }
      return state;
    case SIGN_ACTION.PASSWORD:
      state = {
        ...state,
        password: action.payload.password,
        isSubmitting: false,
      };
      if (state.email.includes("@") && state.password.length >= 8) {
        state.isSubmitting = true;
        return state;
      }
      return state;
    default:
      return new Error();
  }
};
