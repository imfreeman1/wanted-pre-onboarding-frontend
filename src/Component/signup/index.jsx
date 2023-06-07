import React, { useCallback, useEffect, useReducer } from "react";
import Input from "../Input";
import Button from "../Button";
import { signReducer } from "../../Context/signReducer";
import { SignDispatch, SignTask } from "../../Context/signContext";
import { SIGN_ACTION } from "../../Context/action";

const initState = {
  email: "",
  password: "",
  isSubmitting: false,
};

const Signup = () => {
  const [signTask, dispatch] = useReducer(signReducer, initState);

  const handleEmail = (e) => {
    dispatch({
      type: SIGN_ACTION.EMAIL,
      payload: { ...signTask, email: e.target.value },
    });
  };

  const handlePassword = (e) => {
    dispatch({
      type: SIGN_ACTION.PASSWORD,
      payload: { ...signTask, password: e.target.value },
    });
  };

  const handleIsSubmit = useCallback(() => {
    if (signTask.email.includes("@") && signTask.password.length >= 8) {
      console.log("실행됨");
      dispatch({
        type: SIGN_ACTION.SUBMIT,
        payload: { ...signTask, isSubmitting: true },
      });
    }
  }, [signTask]);
  handleIsSubmit();
  return (
    <SignTask.Provider value={signTask}>
      <SignDispatch.Provider value={dispatch}>
        <div>
          <h1>회원가입</h1>
          <form action="#">
            <Input
              placeholder={"email"}
              value={signTask.email}
              onChange={(e) => handleEmail(e)}
              type="text"
            />
            <Input
              placeholder={"password"}
              value={signTask.password}
              onChange={(e) => handlePassword(e)}
              type="password"
            />
            <Button children={"제출"} disabled={!signTask.isSubmitting} />
          </form>
        </div>
      </SignDispatch.Provider>
    </SignTask.Provider>
  );
};

export default Signup;
