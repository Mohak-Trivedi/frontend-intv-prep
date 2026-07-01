import "./App.css";
import DataTable from "./components/DataTable";
import users from "./data/users.js";
import houses from "./data/houses.js";

const userCols = [
  {
    key: "id",
    label: "ID",
    comparator: (a, b, direction) => {
      if (direction === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    },
    renderCell: (user) => user.id,
  },
  {
    key: "name",
    label: "Name",
    comparator: (a, b, direction) => {
      if (direction === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    },
    renderCell: (user) => user.name,
  },
  {
    key: "age",
    label: "Age",
    comparator: (a, b, direction) => {
      if (direction === "asc") {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    },
    renderCell: (user) => user.age,
  },
  {
    key: "occupation",
    label: "Occupation",
    comparator: (a, b, direction) => {
      if (direction === "asc") {
        return a.occupation.localeCompare(b.occupation);
      } else {
        return b.occupation.localeCompare(a.occupation);
      }
    },
    renderCell: (user) => user.occupation,
  },
];

const houseCols = [
  {
    key: "id",
    label: "ID",
    comparator: (a, b, direction) =>
      direction === "asc" ? a.id - b.id : b.id - a.id,
    renderCell: (house) => house.id,
  },
  {
    key: "street",
    label: "Street",
    comparator: (a, b, direction) =>
      direction === "asc"
        ? a.street.localeCompare(b.street)
        : b.street.localeCompare(a.street),
    renderCell: (house) => house.street,
  },
  {
    key: "city",
    label: "City",
    comparator: (a, b, direction) =>
      direction === "asc"
        ? a.city.localeCompare(b.city)
        : b.city.localeCompare(a.city),
    renderCell: (house) => house.city,
  },
  {
    key: "state",
    label: "State",
    comparator: (a, b, direction) =>
      direction === "asc"
        ? a.state.localeCompare(b.state)
        : b.state.localeCompare(a.state),
    renderCell: (house) => house.state,
  },
  {
    key: "zip",
    label: "Zip",
    comparator: (a, b, direction) =>
      direction === "asc" ? a.zip - b.zip : b.zip - a.zip,
    renderCell: (house) => house.zip,
  },
  {
    key: "built_year",
    label: "Built Year",
    comparator: (a, b, direction) =>
      direction === "asc"
        ? a.built_year - b.built_year
        : b.built_year - a.built_year,
    renderCell: (house) => house.built_year,
  },
];

export default function App() {
  return (
    <div>
      <h2>Users</h2>
      <DataTable cols={userCols} data={users} />
      <br />
      <h2>Houses</h2>
      <DataTable cols={houseCols} data={houses} />
    </div>
  );
}
