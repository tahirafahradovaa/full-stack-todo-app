import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { todoContext } from "../TodoContext";

function InputField() {
  const [inputData, setInputData] = useState({ text: "" });
  let { setData } = useContext(todoContext);
  const ref = useRef(null);
  const getData = () => {
    axios
      .get("http://localhost:8080/api/todos")
      .then((res) => setData(res.data));
  };
  const handleClick = () => {
    axios
      .post("http://localhost:8080/api/todos", { text: ref.current.value })
      .then((res) => getData());
    ref.current.value = "";
  };
  return (
    <div className="input-field">
      <input ref={ref} type={"text"} placeholder="Enter New To Do" />
      <button onClick={() => handleClick()} className="add">
        add new
      </button>
    </div>
  );
}

export default InputField;
