import React, { useState, useEffect } from "react"
import "./App.css"
import api from "./api.js"

function App() {
  const [todos, setTodos] = useState([])
  const [showEdit, setShowEdit] = useState(false);
  const [todo, setTodo] = useState([{
    name: "",
    description: "",
    status: "",
  }]);
  const [edit, setEdit] = useState([{
    name: "",
    description: "",
    status: "",
  }])

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const { tasks } = await api.getAllTask()
      setTodos(tasks)
    }
    fetchTodoAndSetTodos()
  }, [])

  const createTodo = async () => {
    const { name, description, status } = todo;
    if(!name || !description || !status) {
      alert('preencha todos os campos')
    }
    const data = {
      name,
      description,
      status
    }
    const newTodo = await api.createTask(data)
    setTodos([...todos, newTodo])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTodo();
  }


  const deleteTodo = async (id) => {
    try {
      await api.deleteTask(id)
      setTodos(todos.filter(({ _id: i }) => id !== i))
    } catch (err) {}
  }

  const updateTodo = async () => {
    const { name, description, status, _id } = edit
    const data = {
      name,
      description,
      status
    }
    await api.updateTask(_id, data)
    setTodos(todos.filter(todo => todo._id === _id))
  }

  const sumbitEdit = () => {
    updateTodo()
  }

  const renderForm = () => {
    return (
      <form
      onSubmit={sumbitEdit}>
      <h1> new task </h1>
      <label htmlFor="title">task name</label>
      <input 
        type="text"
        name="name"
        id="name"
        value={edit.name}
        onChange={(e) => setEdit({...edit, name: e.target.value})}
      />

      <label htmlFor="description">description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={edit.description}
        onChange={(e) => setEdit({...edit, description: e.target.value})}
      />

      <label htmlFor="status">status</label>
      <select 
        name="status" 
        id="status"
        value={edit.status}
        onChange={(e) => setEdit({...edit, status: e.target.value})}
      >
        <option value="incompleta" >Incompleta</option>
        <option value="em andamento">Em andamento</option>
        <option value="completa">completa</option>
      </select>
      <input
        type='submit'
      />
    </form>
    )
  }

  return (
    <div className="App">
      
    <form
      onSubmit={handleSubmit}>
      <h1> new task </h1>
      <label htmlFor="title">task name</label>
      <input 
        type="text"
        name="name"
        id="name"
        value={todo.name}
        onChange={(e) => setTodo({...todo, name: e.target.value})}
      />

      <label htmlFor="description">description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={todo.description}
        onChange={(e) => setTodo({...todo, description: e.target.value})}
      />

      <label htmlFor="status">status</label>
      <select 
        name="status" 
        id="status"
        value={todo.status}
        onChange={(e) => setTodo({...todo, status: e.target.value})}
      >
        <option value="incompleta" >Incompleta</option>
        <option value="em andamento">Em andamento</option>
        <option value="completa">completa</option>
      </select>
      <input
        type='submit'
      />
    </form>
      <ul>
        {todos.map(({ _id, name, description, status }, i) => (
          <li
            key={_id}
          >
            <p>{name}</p>
            <p>{description}</p>
            <p>{status}</p>
          <span onClick={e => deleteTodo(e, _id)}>X</span>
          <span onClick={(e) => {
            e.stopPropagation();
            setShowEdit(true);
            setEdit({
              name,
              description,
              status,
              _id,
            })
          }
          }>edit</span>
          </li>
        ))}
      </ul>
      {showEdit ? renderForm() : null}
    </div>
  )
}

export default App
