import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Cookies from 'js-cookie';
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(index, todo._id)}>Complete</button>
        <button onClick={() => removeTodo(index, todo._id)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const getTodoList = () => {
    const request = async () => {

      let cookie = Cookies.get('todo_nam%e');
      if (cookie == undefined) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        Cookies.set('todo_nam%e', dateTime + Math.random())
      }
      let qry = cookie == undefined ? dateTime + Math.random() : cookie
      const fetchData = await axios.get(`/api/getItems?id=${qry}`)
      setTodos(fetchData.data.Todos);
    };
    request();
  }
  useEffect(() => {
    getTodoList()
  }, [])


  const addTodo = text => {
    const newTodos = [...todos, { text }];
    // setTodos(newTodos);
    let request = async () => {
      let fetchData = await axios.post(`/api/addTodo`, { text: text, isCompleted: false, cookieId: Cookies.get('todo_nam%e') })
      getTodoList();
    };
    request();
  };

  const completeTodo = (id, todoId) => {
    const newTodos = [...todos];
    newTodos[id].isCompleted = !newTodos[id].isCompleted;
    setTodos(newTodos);
    let request = async () => {
      let fetchData = await axios.get(`/api/updatetodo?id=${todoId}&action=${newTodos[id].isCompleted}`)
      getTodoList();
    };
    request();


  };

  const removeTodo = (id, todoId) => {
    const newTodos = [...todos];
    newTodos.splice(id, 1);
    setTodos(newTodos);
    let request = async () => {
      let fetchData = await axios.get(`/api/removetodo?id=${todoId}`)
      getTodoList();
    };
    request();
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;