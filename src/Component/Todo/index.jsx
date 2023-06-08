import React, { useCallback, useEffect, useReducer, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { TodoDispatch, TodoTask } from "../../Context/todoContext";
import { todoReducer } from "../../Context/todoReducer";
import { TODO_ACTION } from "../../Context/action";
import TodoItem from "../TodoItem";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/axios";

const initTodoList = [];

/*
initState = [
  {
    id: number or uuid,
    content : string,
    isCompleted : boolean
}
]
*/

const TodoContainer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  });

  const [todo, setTodo] = useState("");
  const [todoList, dispatch] = useReducer(todoReducer, initTodoList);
  const onChange = useCallback((e) => {
    setTodo(e.target.value);
  }, []);
  const handleSubmit = async (e) => {
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
      console.log(request);
      dispatch({ type: TODO_ACTION.ADD, payload: todo });
      setTodo("");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <TodoTask.Provider value={todoList}>
      <TodoDispatch.Provider value={dispatch}>
        <div>
          <ul>
            {todoList?.map((s) => (
              <TodoItem todo={s} key={s.id} />
            ))}
          </ul>
          <form>
            <Input placeholder="입력" value={todo} onChange={onChange} />
            <Button children={"완료"} onClick={(e) => handleSubmit(e)} />
          </form>
        </div>
      </TodoDispatch.Provider>
    </TodoTask.Provider>
  );
};

export default React.memo(TodoContainer);
