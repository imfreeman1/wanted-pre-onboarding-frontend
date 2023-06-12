import React, { useEffect, useReducer } from "react";
import { TodoDispatch, TodoTask } from "../../Context/todoContext";
import { todoReducer } from "../../Context/todoReducer";
import { TODO_ACTION } from "../../Context/action";
import TodoItem from "../TodoItem";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/axios";
import TodoForm from "../TodoForm";

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
  const [todoList, dispatch] = useReducer(todoReducer, initTodoList);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    if (localStorage.getItem("token")) {
      getTodo();
    }
    async function getTodo() {
      try {
        const result = await axios.request({
          method: "get",
          url: "/todos",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (result.status === 200)
          dispatch({ type: TODO_ACTION.GET, payload: result.data });
      } catch (error) {
        throw new Error(error);
      }
    }
  }, []);

  return (
    <TodoTask.Provider value={todoList}>
      <TodoDispatch.Provider value={dispatch}>
        <div className="grid grid-cols-12 grid-rows-6 w-screen h-screen">
          <div className=" row-start-2 row-span-4 col-start-5 col-span-4 flex flex-col gap-4">
            <ul className="flex flex-col grow border-black border-2 rounded-md bg-indigo-100 overflow-y-auto py-3 ov">
              {todoList?.map((s) => (
                <TodoItem todo={s} key={s.id} />
              ))}
            </ul>
            <TodoForm />
          </div>
        </div>
      </TodoDispatch.Provider>
    </TodoTask.Provider>
  );
};

export default React.memo(TodoContainer);
