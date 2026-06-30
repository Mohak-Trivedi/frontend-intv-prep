import { useState } from "react";
import users from "../data/users.js";

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Occupation", key: "occupation" },
];

function paginateUsers(usersList, pageSize, page) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageUsers = usersList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(usersList.length / pageSize);
  return { pageUsers, totalPages };
}

function sortUsers(usersList, field, direction) {
  const usersClone = usersList.slice();

  switch (field) {
    case "id":
    case "age": {
      return usersClone.sort((a, b) =>
        direction === "asc" ? a[field] - b[field] : b[field] - a[field],
      );
    }
    case "name":
    case "occupation": {
      return usersClone.sort((a, b) =>
        direction === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]),
      );
    }
    default: {
      return usersClone;
    }
  }
}

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedUsers = sortUsers(users, sortField, sortDirection);
  const { pageUsers, totalPages } = paginateUsers(sortedUsers, pageSize, page);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>
                <button
                  onClick={() => {
                    if (key === sortField) {
                      setSortDirection(
                        sortDirection === "asc" ? "desc" : "asc",
                      );
                    } else {
                      setSortField(key);
                      setSortDirection("asc");
                    }
                    setPage(1);
                  }}
                >
                  {label}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageUsers.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="pagination">
        <select
          aria-label="Page size"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <div className="pages">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
