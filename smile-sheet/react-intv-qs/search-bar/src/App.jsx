import "./App.css";
import { Users } from "./users";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search..."
        className="search"
        onChange={e => setQuery(e.target.value)}
      />
      <ul className="list">
        {Users.filter(user => user.first_name.toLowerCase().includes(query)).map((user) => {
          return (
            <li key={user.id} className="listItem">{user.first_name}</li>
          );
        })}
      </ul>
    </div>
  );
}