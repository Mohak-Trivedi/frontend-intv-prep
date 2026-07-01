import { useState } from "react";

function paginateUsers(data, pageSize, page) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);
  return { pageData, totalPages };
}

function sortUsers(data, columns, field, direction) {
  const comparator = columns.find((column) => column.key === field)?.comparator;

  const dataClone = data.slice();

  if (!comparator) return dataClone;

  return dataClone.sort((a, b) => comparator(a, b, direction));
}

export default function DataTable({ cols, data }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedUsers = sortUsers(data, cols, sortField, sortDirection);
  const { pageData, totalPages } = paginateUsers(sortedUsers, pageSize, page);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {cols.map(({ label, key }) => (
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
          {pageData.map((item) => (
            <tr key={item.id}>
              {cols.map(({ key, renderCell }) => (
                <td key={key}>{renderCell(item)}</td>
              ))}
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
