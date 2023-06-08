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

const Signin = () => {
  const [signTask, dispatch] = useReducer(signReducer, initState);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todo");
    }
  }, []);

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

  const handleSubmit = async () => {
    try {
      const request = await axios.request({
        method: "post",
        url: "auth/signin",
        Headers: {
          "Content-Type": "application/json",
        },

        data: {
          email: signTask.email,
          password: signTask.password,
        },
      });
      console.log(request);
      if (request.status === 200) {
        localStorage.setItem("token", request.data.access_token);
        navigate("/todo");
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <SignTask.Provider value={signTask}>
      <SignDispatch.Provider value={dispatch}>
        <div>
          <Input
            placeholder="email"
            type="text"
            value={signTask.email}
            onChange={(e) => handleEmail(e)}
          />
          <Input
            placeholder="password"
            type="password"
            value={signTask.password}
            onChange={(e) => handlePassword(e)}
          />
          <Button
            children={"로그인"}
            onClick={handleSubmit}
            disabled={!signTask.isSubmitting}
          />
        </div>
      </SignDispatch.Provider>
    </SignTask.Provider>
  );
};

export default Signin;
