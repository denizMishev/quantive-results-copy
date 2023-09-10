import { useState, useEffect } from "react";

import * as userService from "../services/userService";

import { Employee } from "./Employee";

export function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    userService.getAllUsers().then((result) => {
      setEmployees(result);
    });
  }, []);

  return (
    <main id="main" className="main-content">
      <section className="teams">
        <header className="section-header home-header">
          <h2>Employees</h2>
          <div className="section-header-buttons-ctr">
            <div className="input-search-ctr">
              <input id="input-search" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                />
              </svg>
            </div>
          </div>
        </header>
        <section className="teams-list">
          <div className="teams-ctr ">
            <ul className="myokrs-grid-content teams-grid-content">
              <li
                id="employees-list-li-header"
                className="myokrs-header teams-header"
              >
                <div className="">
                  <span>Name</span>
                </div>
                <div className="">
                  <span>Team membership</span>
                </div>
              </li>
              {employees.map((employee) => (
                <Employee
                  key={employee._id}
                  currentId={employee._ownerId}
                  username={employee.username}
                />
              ))}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
