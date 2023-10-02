import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { Dropdown } from "./Dropdown";

import * as userService from "../services/userService";
import * as teamsService from "../services/teamsService";

export function FilteringModal(props) {
  const [allUsers, setAllUsers] = useState([]);
  const [allTeams, setAllTeams] = useState([]);

  const { showBoundary } = useErrorBoundary([]);

  let allUsersArray = [];
  let allTeamsArray = [];

  let users = "";
  let teams = "";

  useEffect(() => {
    userService
      .getAllUsers()
      .then((allUsers2) => {
        for (const user of allUsers2) {
          allUsersArray.push({
            value: user.username.toLowerCase(),
            label: user.username,
            id: user._ownerId,
            type: "employee",
          });
        }
        setAllUsers(allUsersArray);
      })
      .catch((err) => {
        showBoundary(err);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    teamsService
      .getAll()
      .then((allTeams2) => {
        for (const team of allTeams2) {
          allTeamsArray.push({
            value: team.teamName.toLowerCase(),
            label: team.teamName,
            id: team._id,
            type: "team",
          });
        }
        setAllTeams(allTeamsArray);
      })
      .catch((err) => {
        showBoundary(err);
      });
    // eslint-disable-next-line
  }, []);

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  if (!props.show) {
    return null;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const filterFormData = [];

    filterFormData.push(users.map((user) => user.id));
    filterFormData.push(teams.map((team) => team.id));

    props.retrieveData(filterFormData.flat());
    props.onClose();
  };

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div
          onClick={props.onClose}
          className="modal-close-icon cursor-pointer icon-hover-gray"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
        <div className="modal-body">
          <form onSubmit={onSubmit} className="okrs-page-filter-modal-form">
            <div className="filter-form-heading-ctr">
              <p>Filter for OKRs</p>
            </div>
            <div className="filter-modal-filter-ctr">
              <label className="filter-modal-filter-label">Teams</label>
              <Dropdown
                isSearchable
                isMulti
                placeHolder="Select a team"
                options={allTeams}
                onChange={(value) => (teams = value)}
                currentValue={[]}
              ></Dropdown>
            </div>
            <div className="filter-modal-filter-ctr">
              <label className="filter-modal-filter-label">Employees</label>
              <Dropdown
                isSearchable
                isMulti
                placeHolder="Select an employee"
                options={allUsers}
                onChange={(value) => (users = value)}
                currentValue={[]}
              ></Dropdown>
            </div>
            <div className="filter-modal-btns-ctr">
              <button
                type="submit"
                className="create-button filter-modal-show-results-btn"
              >
                Show results
              </button>
              <button
                onClick={props.onClose}
                className="create-button filter-modal-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
