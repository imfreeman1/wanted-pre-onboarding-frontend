import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";

const TodoContainer = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const onChange = (e) => {
    setTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    setTodoList((s) => [...s, todo]);
    setTodo("");
  };
  return (
    <div>
      {todoList?.map((todos) => (
        <li>
          <div>
            <span>{todos}</span>
          </div>
        </li>
      ))}
      <Input placeholder="입력" value={todo} onChange={onChange} />
      <Button children={"완료"} onClick={handleSubmit} />
    </div>
  );
};

export default TodoContainer;
