import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { todoContext } from "../TodoContext";

function Todo() {
  let { data, setData } = useContext(todoContext);
  const [selected, setSelected] = useState({
    text: "",
    id: "",
  });
  const [clicked, setClicked] = useState(false);
  const getData = () => {
    axios
      .get("http://localhost:8080/api/todos")
      .then((res) => setData(res.data));
  };

  const handleUpdate = (item) => {
    setClicked(true);
    setSelected({ text: item.text, id: item._id });
  };
  const handleDelete = (item) => {
    axios
      .delete("http://localhost:8080/api/todos/" + item._id)
      .then((res) => getData());
  };
  const handlePut = () => {
    console.log(selected);
    axios
      .put("http://localhost:8080/api/todos/" + selected.id, {
        text: selected.text,
        isCompleted: true,
      })
      .then((res) => getData())
      .then((res) => setClicked(false));
  };

  return (
    <div className="todos">
      {data &&
        data.map((todo, i) => {
          return (
            <>
              <div className="todo-container" key={i}>
                <h1>{todo.date?.slice(11, 16)}</h1>
                <h1>{todo?.text}</h1>
                <button className="update" onClick={() => handleUpdate(todo)}>
                  Update
                </button>
                <button className="delete" onClick={() => handleDelete(todo)}>
                  Delete
                </button>
              </div>
            </>
          );
        })}
      {clicked ? (
        <div className="input-field">
          <input
            value={selected.text}
            onChange={(e) =>
              setSelected((prevState) => {
                return {
                  ...prevState,
                  text: e.target.value,
                };
              })
            }
            type={"text"}
            placeholder="Update To Do"
          />
          <button onClick={() => handlePut()} className="add">
            Update Todo
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Todo;
