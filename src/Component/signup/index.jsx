import React, { useEffect, useReducer } from "react";
import Input from "../Input";
import Button from "../Button";
import { signReducer } from "../../Context/signReducer";
import { SignDispatch, SignTask } from "../../Context/signContext";
import { SIGN_ACTION } from "../../Context/action";
import axios from "../../Utils/axios";
import { useNavigate } from "react-router-dom";

const initState = {
  email: "",
  password: "",
  isSubmitting: false,
};

const Signup = () => {
  const [signTask, dispatch] = useReducer(signReducer, initState);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todo");
    }
  });

  const handleEmail = (e) => {
    dispatch({
      type: SIGN_ACTION.EMAIL,
      payload: { email: e.target.value },
    });
  };

  const handlePassword = (e) => {
    dispatch({
      type: SIGN_ACTION.PASSWORD,
      payload: { password: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.request({
        method: "post",
        url: "auth/signup",
        Headers: {
          "Content-Type": "application/json",
        },

        data: {
          email: signTask.email,
          password: signTask.password,
        },
      });
      console.log(request);
      if (request.status === 201) navigate("/signin");
    } catch (error) {
      throw new Error(error);
    }
  };

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
              testID={"email-input"}
            />
            <Input
              placeholder={"password"}
              value={signTask.password}
              onChange={(e) => handlePassword(e)}
              type="password"
              testID={"password-input"}
            />
            <Button
              children={"회원가입"}
              disabled={!signTask.isSubmitting}
              onClick={(e) => handleSubmit(e)}
              testID={"signup-button"}
            />
          </form>
        </div>
      </SignDispatch.Provider>
    </SignTask.Provider>
  );
};

export default Signup;
