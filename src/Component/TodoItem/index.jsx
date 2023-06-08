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
  }, [isEditing]);
  const handleModify = useCallback(
    (e, task) => {
      dispatch({
        type: TODO_ACTION.MODIFY,
        payload: { ...task, content: e.target.value },
      });
    },
    [dispatch]
  );
  const handleRemove = useCallback(
    (id) => {
      dispatch({ type: TODO_ACTION.REMOVE, payload: id });
    },
    [dispatch]
  );
  const handleCheck = (e, task) => {
    dispatch({
      type: TODO_ACTION.CHECK,
      payload: { ...task, isCompleted: e.target.checked },
    });
  };
  return (
    <li key={todo.id}>
      <div>
        <label>
          <Input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={(e) => handleCheck(e, todo)}
          />
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
                onChange={(e) => handleModify(e, todo)}
              />
              <Button children={"완료"} onClick={handleEditing} />
            </>
          )}
        </label>

        <Button children={"삭제"} onClick={() => handleRemove(todo.id)} />
      </div>
    </li>
  );
};

export default TodoItem;
