import { useEffect, useState } from "react";
import Progress from "../components/Progress";
import Filter from "../components/Filter";
import List from "../components/List";
import "./TodoList.scss";
import { useTodoListState } from "../context/TodoListContext";

const TodoList = () => {
  const { taskInfo, taskFilter } = useTodoListState();
  const [completeList, setCompleteList] = useState<number>(0);

  useEffect(() => {
    setCompleteList(
      taskInfo.filter((obj) => obj.completed === true)?.length || 0
    );
  }, [taskInfo]);

  return (
    <div className="todos-container">
      <div className="progress-wrapper">
        <Progress totalList={taskInfo.length} completeList={completeList} />
      </div>
      <div className="filter-wrapper">
        <Filter />
      </div>
      <div className="list-wrapper">
        {taskFilter.map((list) => {
          return (
            <List
              key={list.id}
              id={list.id}
              isComplete={list.completed}
              listDetail={list.title}
            />
          );
        })}
        <List id="isNew" isNew isComplete={false} listDetail={""} />
      </div>
    </div>
  );
};

export default TodoList;
