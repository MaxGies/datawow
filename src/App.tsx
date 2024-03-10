import React from "react";
import "./App.scss";
import TodoList from "./container/TodoList";
import { TodoListProvider } from "./context/TodoListContext";

function App() {
  return (
    <TodoListProvider>
      <div className="App">
        <TodoList />
      </div>
    </TodoListProvider>
  );
}

export default App;
