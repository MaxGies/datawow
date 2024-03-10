import { useState } from "react";
import Progress from "../components/Progress";
import Filter from "../components/Filter";
import List from "../components/List";
import "./TodoList.scss";

const TodoList = () => {
  const [percent, setPercen] = useState(0);

  return (
    <div className="todos-container">
      <div className="progress-wrapper">
        <Progress totalList={3} completeList={1} />
      </div>
      <div className="filter-wrapper">
        <Filter />
      </div>
      <div className="list-wrapper">
        <List isComplete={false} listDetail={"ทดสอบ 1"} />
        <List isComplete listDetail={"ทดสอบ 2"} />
        <List isComplete={false} listDetail={"ทดสอบ 3"} />
        <List isNew isComplete={false} listDetail={""} />
      </div>
    </div>
  );
};

export default TodoList;
