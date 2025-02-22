import React, { FC, useState, useEffect } from "react";

interface UserTodosProps {
  username: string;
}

const UserTodos: FC<UserTodosProps> = ({ username }) => {
  const [todos, setTodos] = useState<Array<JSX.Element>>();
  // eslint-disable-next-line
  const setUsersTodos = async () => {
    console.log("inside real UserTodos.setUsersTodos");
    try {
    const usersResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    if (usersResponse.ok) {
      const users = await usersResponse.json();
      const userByName = users.find((usr: any) => {
        return usr.username.toLowerCase() === username;
      });
      console.log("user by username", userByName);
      const todosResponse = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      if (userByName && todosResponse.ok) {
        const todos = await todosResponse.json();
        const usersTodos = todos.filter((todo: any) => {
          return todo.userId === userByName.id;
        });
        const todoList = usersTodos.map((todo: any) => {
          return <li key={todo.id}>{todo.title}</li>;
        });
        setTodos(todoList);
        console.log("user todos", usersTodos);
      }
    }} catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (username) {
      setUsersTodos();
    }
  }, [username, setUsersTodos]);

  return <ul style={{ marginTop: "1rem", listStyleType: "none" }}>{todos}</ul>;
};

export default UserTodos;
