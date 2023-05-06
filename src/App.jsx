import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/inputTodo";
import { InCompleteTodos } from "./components/incompleteTodos";
import { CompleteTodos } from "./components/completeTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const deleteTodo = (todos, setter, index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setter(newTodos);
  };

  const moveTodo = (srcTodos, srcSetter, dstTodos, dstSetter, index) => {
    deleteTodo(srcTodos, srcSetter, index);
    const newDstTodos = [...dstTodos, srcTodos[index]];
    dstSetter(newDstTodos);
  };

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    deleteTodo(incompleteTodos, setIncompleteTodos, index);
  };

  const onClickComplete = (index) => {
    moveTodo(
      incompleteTodos,
      setIncompleteTodos,
      completeTodos,
      setCompleteTodos,
      index
    );
  };

  const onClickBack = (index) => {
    moveTodo(
      completeTodos,
      setCompleteTodos,
      incompleteTodos,
      setIncompleteTodos,
      index
    );
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 3}
      />
      {incompleteTodos.length >= 3 && (
        <p style={{ color: "red" }}>
          登録できるTODOは3個まで!消化してください。
        </p>
      )}
      <InCompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
