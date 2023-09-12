import { useContext, useEffect, useState } from "react";

import { OkrContext } from "../contexts/OkrContext";
import { TeamContext } from "../contexts/TeamContext";

import { Dropdown } from "./Dropdown";
import { TeamChip } from "./team-chip";

import * as okrService from "../services/okrService";
import * as userService from "../services/userService";
import * as teamsService from "../services/teamsService";

export function EditModal({ type, currentTarget, onClose, show }) {
  const { okrAdd } = useContext(OkrContext);
  const { teamAdd } = useContext(TeamContext);
  const [dropdownUsersAndTeams, setDropdownUsersAndTeams] = useState([]);
  let newUsers = "";
  let newManager = "";

  let dropdownDefaultValue = currentTarget.okrOwners?.map((okrOwner) => {
    return {
      value: okrOwner.okrOwner.toLowerCase(),
      label: okrOwner.okrOwner,
      id: okrOwner.okrOwnerId,
      type: okrOwner.type,
    };
  });

  useEffect(() => {
    Promise.all([userService.getAllUsers(), teamsService.getAll()]).then(
      (usersAndTeamsRequests) => {
        let usersAndOrTeamsArray = [];
        if (usersAndTeamsRequests[1].code === 404 || type === "team") {
          for (const user of usersAndTeamsRequests[0]) {
            usersAndOrTeamsArray.push({
              value: user.username.toLowerCase(),
              label: user.username,
              id: user._ownerId,
              type: "employee",
            });
          }
        } else {
          for (const request of usersAndTeamsRequests) {
            for (const userOrTeam of request) {
              if (userOrTeam.username) {
                usersAndOrTeamsArray.push({
                  value: userOrTeam.username.toLowerCase(),
                  label: userOrTeam.username,
                  id: userOrTeam._ownerId,
                  type: "employee",
                });
              } else if (userOrTeam.teamName) {
                usersAndOrTeamsArray.push({
                  value: userOrTeam.teamName.toLowerCase(),
                  label: userOrTeam.teamName,
                  id: userOrTeam._id,
                  type: "team",
                });
              }
            }
          }
        }
        setDropdownUsersAndTeams(usersAndOrTeamsArray);
      }
    );
    // eslint-disable-next-line
  }, []);

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  if (!show) {
    return null;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const editFormData = Object.fromEntries(new FormData(e.target));

    if (type === "okr") {
      editFormData.okrOwners = newUsers.map((user) => {
        return { okrOwner: user.label, okrOwnerId: user.id, type: user.type };
      });

      okrService.edit(currentTarget._id, editFormData).then(onClose());
    }
  };

  return (
    <main id="main" className="main-content">
      <section
        className="create-okr-ctr"
        style={type === "team" ? { top: "-16.5rem" } : {}}
      >
        <form
          onSubmit={onSubmit}
          className="create-okr-form centered-full-screen"
        >
          <div className="create-okr-form-heading-ctr">
            <div
              id="special123"
              className="create-okr-form-svg-ctr"
              onClick={onClose}
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
            <span>Edit {currentTarget === "okr" ? "Objective" : "Team"}</span>
            <span>
              Update the details of this {type === "okr" ? "Objective" : "Team"}
            </span>
          </div>
          <div className="create-okr-form-input-fields-ctr">
            <div className="create-okr-form-input-ctr">
              <label htmlFor="">{type === "okr" ? "Title" : "Name"}</label>
              <input
                name={type === "okr" ? "okrTitle" : "teamName"}
                type="text"
                defaultValue={currentTarget.okrTitle}
              />
            </div>
            {type === "team" ? (
              <div className="create-okr-form-input-ctr second-dropdown-menu-corrector">
                <label htmlFor="">Manager</label>
                <Dropdown
                  isSearchable
                  isMulti
                  placeHolder="Select a manager for your team"
                  options={dropdownUsersAndTeams}
                  onChange={(value) => (newManager = value)}
                ></Dropdown>
              </div>
            ) : (
              ""
            )}
            <div className="create-okr-form-input-ctr">
              <label htmlFor="">{type === "okr" ? "Owner" : "Members"}</label>
              <Dropdown
                isSearchable
                isMulti
                placeHolder={"123"}
                options={dropdownUsersAndTeams}
                onChange={(value) => (newUsers = value)}
                currentValue={dropdownDefaultValue}
              ></Dropdown>
            </div>
            <div className="create-okr-form-input-ctr">
              <label htmlFor="">Description</label>
              <input
                name={type === "okr" ? "okrDescription" : "teamDescription"}
                type="text"
                defaultValue={currentTarget.okrDescription}
              />
            </div>
          </div>
          <div className="create-okr-form-btns-ctr">
            <button type="submit">
              Edit {type === "okr" ? "OKR" : "Team"}
            </button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </section>
    </main>
  );
}
