import axios from "axios"

const API_URL = "http://localhost:3000/task/"

async function createTask(task) {
  console.log(task);
  const { data: newTodo } = await axios.post(API_URL, task)
  return newTodo
}

async function deleteTask(id) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function updateTask(id, payload) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload)
  return newTodo
}

async function getAllTask() {
  const { data: todos } = await axios.get(API_URL)
  return todos
}

const exportedObject = {
  createTask,
	deleteTask,
	updateTask,
	getAllTask
};

export default exportedObject;