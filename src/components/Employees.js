import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as userService from "../services/userService";

export function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    userService.getAllUsers().then((result) => {
      setEmployees(result);
    });
  }, []);

  return (
    <div id="employees-main">
      <header id="employees-header">Employees</header>
      <div id="employees-container">
        <ul id="employees-container-list">
          {employees?.map((employee) => (
            <Link
              to={`/employees/${employee._id}`}
              id="employees-container-list-items"
              key={employee._id}
            >
              {employee.username}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
