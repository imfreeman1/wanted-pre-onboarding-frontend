import React, { useCallback, useReducer, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { TodoDispatch, TodoTask } from "../../Context/todoContext";
import { todoReducer } from "../../Context/todoReducer";
import { TODO_ACTION } from "../../Context/action";
import TodoItem from "../TodoItem";

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
  const [todo, setTodo] = useState("");
  const [todoList, dispatch] = useReducer(todoReducer, initTodoList);
  const onChange = useCallback((e) => {
    setTodo(e.target.value);
  }, []);
  const handleSubmit = useCallback(() => {
    dispatch({ type: TODO_ACTION.ADD, payload: todo });
    setTodo("");
  }, [dispatch, todo]);

  return (
    <TodoTask.Provider value={todoList}>
      <TodoDispatch.Provider value={dispatch}>
        <div>
          <ul>
            {todoList?.map((s) => (
              <TodoItem todo={s} key={s.id} />
            ))}
          </ul>
          <form action="#">
            <Input placeholder="입력" value={todo} onChange={onChange} />
            <Button children={"완료"} onClick={handleSubmit} />
          </form>
        </div>
      </TodoDispatch.Provider>
    </TodoTask.Provider>
  );
};

export default React.memo(TodoContainer);
