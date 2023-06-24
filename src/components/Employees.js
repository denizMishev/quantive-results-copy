import { useEffect, useState } from "react";
import * as userService from "../services/userService";

export function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    userService.getAllUsers().then((result) => {
      setEmployees(result);
    });
  }, []);

  console.log(employees);

  return (
    <div id="employees-main">
      <header id="employees-header">Employees</header>
      <div id="employees-container">
        <ul id="employees-container-list">
          {employees?.map((employee) => (
            <li key={employee._id}>{employee.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
