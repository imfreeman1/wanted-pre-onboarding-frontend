import React from "react";
import Input from "../Input";
import Button from "../Button";

const Presenter = ({
  todo,
  isEditing,
  modifyContent,
  handleCheck,
  handleBlur,
  handleEditing,
  handleRemove,
  handleModify,
  handleCancel,
}) => {
  return (
    <li key={todo.id} className="flex gap-5 mx-4 my-1">
      {!isEditing ? (
        <>
          <label className="grow flex gap-3">
            <Input
              className="p-2"
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCheck(todo)}
            />
            <span className="grow truncate">{todo.content}</span>
          </label>
          <Button
            className="hover:text-slate-400 duration-300"
            children={"수정"}
            onClick={handleEditing}
            testID={"modify-button"}
          />
          <Button
            className="hover:text-slate-400 duration-300"
            children={"삭제"}
            onClick={() => handleRemove(todo.id)}
            testID={"delete-button"}
          />
        </>
      ) : (
        <>
          <label className="grow flex gap-3">
            <Input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCheck(todo)}
            />
            <Input
              className="border-2 border-slate-400 rounded-md px-2 py-1"
              ouBlur={handleBlur}
              type="text"
              value={modifyContent}
              onChange={(e) => handleModify(e)}
              testID={"modify-input"}
            />
          </label>
          <Button
            className="hover:text-slate-400 duration-300"
            children={"완료"}
            onClick={() => handleEditing(todo)}
            testID={"submit-button"}
          />
          <Button
            className="hover:text-slate-400 duration-300"
            children={"취소"}
            onClick={handleCancel}
            testID={"cancel-button"}
          />
        </>
      )}
    </li>
  );
};

export default Presenter;
