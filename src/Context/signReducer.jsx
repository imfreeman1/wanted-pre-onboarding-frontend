import { SIGN_ACTION } from "./action";

export const signReducer = (state, action) => {
  switch (action.type) {
    case SIGN_ACTION.EMAIL:
      state = { ...state, email: action.payload.email };
      return state;
    case SIGN_ACTION.PASSWORD:
      state = { ...state, password: action.payload.password };
      return state;
    case SIGN_ACTION.SUBMIT:
      state = { ...state, isSubmitting: action.payload.isSubmitting };
      return state;
    default:
      return new Error();
  }
};
