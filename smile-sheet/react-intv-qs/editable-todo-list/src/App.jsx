import { useState } from "react";
import "./App.css";

const newID = (() => {
  let id = 0;
  return () => id++;
})();

const INITIAL_TODOS = [
  {
    id: newID(),
    label: "Walk the dog",
    completed: false,
  },
  {
    id: newID(),
    label: "Water the plants",
    completed: false,
  },
  {
    id: newID(),
    label: "Wash the dishes",
    completed: false,
  },
];

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [newTodo, setNewTodo] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null); // to keep track of which todo is being edited

  function addTodo(e) {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: newID(), label: newTodo.trim(), completed: false }]);
    setNewTodo("");
  }

  function deleteTodo(deleteId) {
    if (window.confirm("Are you sure you want to delete the task?")) {
      const filteredTodos = todos.filter((todo) => todo.id !== deleteId);
      setTodos(filteredTodos);
    }
  }

  function toggleTodo(toggleId) {
    const updatedTodos = todos.map((todo) =>
      todo.id === toggleId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  function updateTodoText(updateId, newText) {
    const updatedTodos = todos.map((todo) =>
      todo.id === updateId ? { ...todo, label: newText } : todo
    );
    setTodos(updatedTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          aria-label="Add new task"
          type="text"
          placeholder="Add your task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {todos.length === 0 ? (
        <div>No tasks added</div>
      ) : (
        <ul>
          {todos.map(({ id, label, completed }) => (
            <li key={id}>
              <input type="checkbox" checked={completed} onChange={() => toggleTodo(id)} />
              {editId === id ?
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => {
                    setEditId(null);
                    updateTodoText(id, editText);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEditId(null);
                      updateTodoText(id, editText);
                    }
                  }} /> :
                <span
                  onDoubleClick={() => {
                    if (!completed) {
                      setEditId(id);
                      setEditText(label);
                    }
                  }}
                  className={completed ? "completed" : ""}
                >
                  {label}
                </span>
              }
              <button onClick={() => deleteTodo(id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
