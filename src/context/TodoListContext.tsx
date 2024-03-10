import React, { useState, useEffect, useContext, createContext } from "react";
import { editTask, todos } from "../utils/types";
import TodoService from "../utils/TodoService";

interface State {
  actions: {
    reciveTodo: () => Promise<any>;
    addTask: (todo: string) => Promise<any>;
    editTask: (editTodo: editTask) => Promise<any>;
    deleteTask: (todoId: string) => Promise<any>;
    handleFilter: (filter: string) => any;
  };
  taskInfo: todos[];
  filterType: string[];
  filter: string;
  taskFilter: todos[];
}

interface AppointmentsProviderProps {
  children: React.ReactNode;
}

const TodoListStateContext = createContext<State | undefined>(undefined);

const TodoListProvider: React.FC<AppointmentsProviderProps> = ({
  children,
}) => {
  const filterType = ["All", "Done", "Undone"];
  const [taskInfo, setTaskInfo] = useState<todos[]>([]);
  const [filter, setFilter] = useState<string>(filterType[0]);
  const [taskFilter, setTaskFilter] = useState<todos[]>([]);

  useEffect(() => {
    actions.reciveTodo();
  }, []);

  useEffect(() => {
    if (taskInfo?.length < 1) {
      return setTaskFilter([]);
    }
    if (filter === filterType[1]) {
      setTaskFilter(taskInfo.filter((obj) => obj.completed === true));
    } else if (filter === filterType[2]) {
      setTaskFilter(taskInfo.filter((obj) => obj.completed === false));
    } else {
      setTaskFilter(taskInfo);
    }
  }, [filter, taskInfo]);

  const actions = {
    reciveTodo: async () => {
      const result = await TodoService.getTodo();

      if (result.status === 200) {
        setTaskInfo(result.data);
      } else {
        console.warn(result.data);
      }
    },
    addTask: async (todo: string) => {
      const result = await TodoService.addTodo({
        title: todo,
        completed: false,
      });

      if (result.status === 201) {
        setTaskInfo([...taskInfo, result.data]);
      } else {
        console.warn(result.data);
      }
    },
    editTask: async ({ todoId, todo, completed }: editTask) => {
      const result = await TodoService.editTodo(
        {
          title: todo,
          completed: completed,
        },
        todoId
      );

      if (result.status === 200) {
        actions.reciveTodo();
      } else {
        console.warn(result.data);
      }
    },
    deleteTask: async (todoId: string) => {
      const deleteTask = taskInfo.filter((obj) => obj.id !== todoId);

      setTaskInfo(deleteTask || []);
      const result = await TodoService.deleteTodo(todoId);

      if (result.status === 200) {
        actions.reciveTodo();
      } else {
        console.warn(result.data);
      }
    },
    handleFilter: (filter: string) => {
      setFilter(filter);
    },
  };

  return (
    <TodoListStateContext.Provider
      value={{
        actions,
        taskInfo,
        filterType,
        filter,
        taskFilter,
      }}
    >
      {children}
    </TodoListStateContext.Provider>
  );
};

function useTodoListState(): State {
  const context = useContext(TodoListStateContext);
  if (context === undefined) {
    throw new Error(
      "useTodoListState must be used within a AppointmentListsProvider"
    );
  }
  return context;
}

export { TodoListProvider, useTodoListState };
