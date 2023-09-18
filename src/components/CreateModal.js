import { useContext, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { OkrContext } from "../contexts/OkrContext";
import { TeamContext } from "../contexts/TeamContext";
import { AuthContext } from "../contexts/AuthContext";

import { Dropdown } from "./Dropdown";

import * as okrService from "../services/okrService";
import * as userService from "../services/userService";
import * as teamsService from "../services/teamsService";

export function CreateModal(props) {
  const { user } = useContext(AuthContext);
  const { okrAdd } = useContext(OkrContext);
  const { teamAdd } = useContext(TeamContext);
  const [dropdownUsersAndTeams, setDropdownUsersAndTeams] = useState([]);

  const { showBoundary } = useErrorBoundary([]);

  let users = "";
  let manager = "";

  useEffect(() => {
    Promise.all([userService.getAllUsers(), teamsService.getAll()])
      .then((usersAndTeamsRequests) => {
        let usersAndOrTeamsArray = [];
        if (usersAndTeamsRequests[1].code === 404 || props.type === "team") {
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

    const createFormData = Object.fromEntries(new FormData(e.target));
    createFormData.editorUsername = user.username;

    if (props.type === "okr") {
      createFormData.okrOwners = users.map((user) => {
        return { okrOwner: user.label, okrOwnerId: user.id, type: user.type };
      });

      okrService
        .create(createFormData)
        .then((newOkr) => {
          okrAdd(newOkr);
          props.onClose();
        })
        .catch((err) => {
          showBoundary(err);
        });
    } else {
      createFormData.teamManager = {
        managerName: manager[0].label,
        managerId: manager[0].id,
        type: manager[0].type,
      };
      createFormData.teamMembers = users.map((user) => {
        return { memberName: user.label, memberId: user.id, type: user.type };
      });

      teamsService
        .create(createFormData)
        .then((newTeam) => {
          teamAdd(newTeam);
          props.onClose();
        })
        .catch((err) => {
          showBoundary(err);
        });
    }
  };

  return (
    <main id="main" className="main-content">
      <section
        className="create-okr-ctr"
        style={props.type === "team" ? { top: "-16.5rem" } : {}}
      >
        <form
          onSubmit={onSubmit}
          className="create-okr-form centered-full-screen"
        >
          <div className="create-okr-form-heading-ctr">
            <div className="create-okr-form-svg-ctr" onClick={props.onClose}>
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
            <span>Create {props.type === "okr" ? "Objective" : "Team"}</span>
            <span>All required fields are marked with an asterisk (*).</span>
          </div>
          <div className="create-okr-form-input-fields-ctr">
            <div className="create-okr-form-input-ctr">
              <label htmlFor="">
                {props.type === "okr" ? "Title*" : "Name*"}
              </label>
              <input
                name={props.type === "okr" ? "okrTitle" : "teamName"}
                type="text"
                placeholder={
                  props.type === "okr"
                    ? "Enter your OKR's title"
                    : "Enter your team's name"
                }
              />
            </div>
            {props.type === "team" ? (
              <div className="create-okr-form-input-ctr second-dropdown-menu-corrector">
                <label htmlFor="">Manager*</label>
                <Dropdown
                  isSearchable
                  isMulti
                  placeHolder="Select a manager for your team"
                  options={dropdownUsersAndTeams}
                  onChange={(value) => (manager = value)}
                  currentValue={[]}
                ></Dropdown>
              </div>
            ) : (
              ""
            )}
            <div className="create-okr-form-input-ctr">
              <label htmlFor="">
                {props.type === "okr" ? "Owner*" : "Members*"}
              </label>
              <Dropdown
                isSearchable
                isMulti
                placeHolder={
                  props.type === "okr"
                    ? "Select owner/s for your OKR"
                    : "Select members for your team"
                }
                options={dropdownUsersAndTeams}
                onChange={(value) => (users = value)}
                currentValue={[]}
              ></Dropdown>
            </div>
            <div className="create-okr-form-input-ctr">
              <label htmlFor="">Description*</label>
              <input
                name={
                  props.type === "okr" ? "okrDescription" : "teamDescription"
                }
                type="text"
                placeholder={
                  props.type === "okr"
                    ? "Enter your OKR's description"
                    : "Enter your team's description"
                }
              />
            </div>
          </div>
          <div className="create-okr-form-btns-ctr">
            <button type="submit">
              Create {props.type === "okr" ? "OKR" : "Team"}
            </button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </form>
      </section>
    </main>
  );
}
