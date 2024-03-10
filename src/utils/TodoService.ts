import axios from "./axios";

interface ParamsAddTodo {
  title: string;
  completed: boolean;
}

async function getTodo() {
  const res = axios
    .get("/todos")
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });

  return res;
}

async function addTodo(params: ParamsAddTodo) {
  const res = axios
    .post("/todos", params)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });

  return res;
}

async function editTodo(params: ParamsAddTodo, id: string) {
  const res = axios
    .put(`/todos/${id}`, params)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });

  return res;
}

async function deleteTodo(id: string) {
  const res = axios
    .delete(`/todos/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });

  return res;
}

export default {
  getTodo,
  addTodo,
  editTodo,
  deleteTodo,
};
