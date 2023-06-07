import React, { useContext, useState, useCallback } from "react";
import Button from "../Button";
import Input from "../Input";
import { TodoDispatch } from "../../Context/todoContext";
import { TODO_ACTION } from "../../Context/action";

const TodoItem = ({ todo }) => {
  const dispatch = useContext(TodoDispatch);
  const [isEditing, setIsEditing] = useState(false);
  const handleEditing = useCallback(() => {
    setIsEditing(!isEditing);
  });
  const handleReWrite = useCallback((task) => {});
  const handleRemove = useCallback((id) => {
    dispatch({ type: TODO_ACTION.REMOVE, payload: id });
  }, []);
  return (
    <li key={todo.id}>
      <div>
        <Input type="checkbox" />
        {!isEditing ? (
          <>
            <span>{todo.content}</span>
            <Button children={"수정"} onClick={handleEditing} />
          </>
        ) : (
          <>
            <Input
              type="text"
              value={todo.content}
              onChange={() => handleReWrite(todo.id)}
            />
            <Button children={"완료"} onClick={handleEditing} />
          </>
        )}
        <Button children={"삭제"} onClick={() => handleRemove(todo.id)} />
      </div>
    </li>
  );
};

export default TodoItem;
