import React, { useCallback, useContext, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import axios from "../../Utils/axios";
import { TodoDispatch } from "../../Context/todoContext";
import { TODO_ACTION } from "../../Context/action";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useContext(TodoDispatch);

  const onChange = useCallback((e) => {
    setTodo(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const request = await axios.request({
          method: "post",
          url: "/todos",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          data: { todo },
        });
        if (request.status === 201) {
          dispatch({
            type: TODO_ACTION.ADD,
            payload: { id: request.data.id, content: request.data.todo },
          });
          setTodo("");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch, todo]
  );

  return (
    <form className="flex justify-end gap-2 mx-2">
      <Input
        className="border-2 border-slate-400 rounded-md px-2 py-1"
        placeholder="입력"
        value={todo}
        onChange={onChange}
        testID={"new-todo-input"}
      />
      <Button
        className="bg-blue-500 px-2 rounded-md border-2 text-white hover:bg-white hover:text-blue-500 hover:border-blue-500 duration-300"
        children={"완료"}
        onClick={(e) => handleSubmit(e)}
        disabled={todo === "" ? true : false}
        testID={"new-todo-add-button"}
      />
    </form>
  );
};

export default React.memo(TodoForm);
