import { createContext, useState } from "react";

export const todoContext = createContext(null);
export const TodoProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const values = {
    data,
    setData,
  };
  return <todoContext.Provider value={values}>{children}</todoContext.Provider>;
};
