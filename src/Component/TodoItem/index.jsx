import React, { useContext, useState, useCallback } from "react";
import { TodoDispatch } from "../../Context/todoContext";
import { TODO_ACTION } from "../../Context/action";
import axios from "../../Utils/axios";
import Presenter from "./Presenter";

const TodoItem = ({ todo }) => {
  const dispatch = useContext(TodoDispatch);
  const [isEditing, setIsEditing] = useState(false);
  const [modifyContent, setModifyContent] = useState(todo.content);

  const handleEditing = useCallback(
    async (task) => {
      try {
        if (isEditing) {
          await axios.request({
            url: `/todos/${task.id}`,
            method: "put",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            data: {
              todo: task.content,
              isCompleted: task.isCompleted,
            },
          });
          dispatch({
            type: TODO_ACTION.MODIFY,
            payload: { ...task, content: modifyContent },
          });
        }
        setIsEditing(!isEditing);
      } catch (error) {}
    },
    [isEditing, modifyContent, dispatch]
  );
  const handleModify = useCallback((e) => {
    setModifyContent(e.target.value);
  }, []);
  const handleRemove = useCallback(
    async (id) => {
      try {
        await axios.request({
          url: `/todos/${todo.id}`,
          method: "delete",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        dispatch({ type: TODO_ACTION.REMOVE, payload: id });
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch, todo.id]
  );
  const handleBlur = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);
  const handleCheck = useCallback(
    async (task) => {
      try {
        await axios.request({
          url: `/todos/${task.id}`,
          method: "put",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          data: {
            todo: task.content,
            isCompleted: !task.isCompleted,
          },
        });
        dispatch({
          type: TODO_ACTION.CHECK,
          payload: { ...task, isCompleted: !task.isCompleted },
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch]
  );
  const handleCancel = useCallback(() => {
    setModifyContent(todo.content);
    setIsEditing(!isEditing);
  }, [isEditing, todo.content]);

  return (
    <Presenter
      todo={todo}
      isEditing={isEditing}
      handleBlur={handleBlur}
      handleCheck={handleCheck}
      handleCancel={handleCancel}
      handleRemove={handleRemove}
      handleModify={handleModify}
      handleEditing={handleEditing}
      modifyContent={modifyContent}
    />
  );
};

export default React.memo(TodoItem);
