import axios from "axios";
import React, { useContext, useEffect } from "react";
import InputField from "./components/InputField";
import Todo from "./components/Todo";
import { todoContext } from "./TodoContext";

function App() {
  let { data, setData } = useContext(todoContext);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/todos")
      .then((res) => setData(res.data));
  }, []);
  return (
    <>
      <div className="container">
        <InputField />
        <Todo />
      </div>
    </>
  );
}

export default App;
