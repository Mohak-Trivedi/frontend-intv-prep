// Question: https://www.greatfrontend.com/questions/user-interface/generate-table/react?practice=practice&tab=coding

import { useState } from "react";
import "./App.css";

function Table({ rows, cols }) {
  return (
    <table>
      {Array.from({ length: rows }).map((_, row) => {
        return (
          <tr>
            {Array.from({ length: cols }).map((_, col) => {
              return (
                <td>
                  {col % 2 === 0 ? rows * col + (row + 1) : rows * (col + 1) - row}
                </td>
              );
             })}
          </tr>
        );
      }) }
    </table>
  );
}

function App() {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const rows = Number(data.get("rows"));
    setRows(rows);
    const columns = Number(data.get("columns"));
    setColumns(columns);
  }

  return (
    <div className="app">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="rows">Rows</label>
          <input
            type="number"
            min={1}
            id="rows"
            name="rows"
            defaultValue={rows}
          />
        </div>
        <div>
          <label htmlFor="columns">Columns</label>
          <input
            type="number"
            min={1}
            id="columns"
            name="columns"
            defaultValue={columns}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {Boolean(rows) && Boolean(columns) && (
        <Table rows={rows} cols={columns} />
      )}
    </div>
  );
}

export default App;
