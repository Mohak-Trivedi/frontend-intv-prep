import { useState } from "react";

const newID = (() => {
  let id = 0;
  return () => id++;
})();

const INITIAL_TODOS = [
  {
    id: newID(),
    label: "Walk the dog",
  },
  {
    id: newID(),
    label: "Water the plants",
  },
  {
    id: newID(),
    label: "Wash the dishes",
  },
];

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [newTodo, setNewTodo] = useState("");

  function addTodo(e) {
    e.preventDefault();
    if(newTodo.trim()==="") return;
    setTodos([ ...todos, { id: newID(), label: newTodo.trim() } ]);
    setNewTodo("");
  }

  function deleteTodo(deleteId) {
    if(window.confirm('Are you sure you want to delete the task?')) {
      const filteredTodos = todos.filter(todo => todo.id!==deleteId);
      setTodos(filteredTodos);
    }
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
          onChange={e => setNewTodo(e.target.value)}
        />
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      {todos.length === 0 ? (
        <div>No tasks added</div>
      ) : (
        <ul>
          {todos.map(({id, label}) => (
            <li key={id}>
              <span>{label}</span>
              <button onClick={() => deleteTodo(id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
