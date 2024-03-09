import { useState } from "react";
import Progress from "../components/Progress";
import Filter from "../components/Filter";
import List from "../components/List";

const TodoList = () => {
  const [percent, setPercen] = useState(0);
  return (
    <>
      <Progress />
      <Filter />
      <List />
    </>
  );
};

export default TodoList;
