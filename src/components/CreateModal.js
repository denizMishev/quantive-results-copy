import { useContext, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { OkrContext } from "../contexts/OkrContext";
import { TeamContext } from "../contexts/TeamContext";
import { AuthContext } from "../contexts/AuthContext";

import { Dropdown } from "./Dropdown";

import * as okrService from "../services/okrService";
import * as userService from "../services/userService";
import * as teamsService from "../services/teamsService";

let validatingFormButtonStyles = {
  buttonUnavailable: {
    backgroundColor: "#b0b5ba",
    pointerEvents: "none",
  },
  buttonAvailable: {
    backgroundColor: "#05f",
    pointerEvents: "auto",
  },
};

export function CreateModal(props) {
  const { user } = useContext(AuthContext);
  const { okrAdd } = useContext(OkrContext);
  const { teamAdd } = useContext(TeamContext);
  const [dropdownUsersAndTeams, setDropdownUsersAndTeams] = useState([]);
  const [validateFormStyle, setValidateFormStyle] = useState(
    validatingFormButtonStyles.buttonAvailable
  );

  let teamMembers = "";
  let manager = "";

  const [createOkrFormValues, setCreateOkrFormValues] = useState({
    okrTitle: "",
    okrOwners: "",
    okrDescription: "",
  });
  const [createTeamFormValues, setCreateTeamFormValues] = useState({
    teamName: "",
    teamDescription: "",
  });

  useEffect(() => {
    let createFormValues = undefined;

    if (props.type === "okr") {
      createFormValues = Object.values(createOkrFormValues);
    } else {
      createFormValues = Object.values(createTeamFormValues);
    }

    let valid = true;

    for (const formValue of createFormValues) {
      if (formValue.length === 0) {
        valid = false;
      }
    }

    if (valid) {
      setValidateFormStyle(validatingFormButtonStyles.buttonAvailable);
    } else {
      setValidateFormStyle(validatingFormButtonStyles.buttonUnavailable);
    }
  }, [createOkrFormValues, createTeamFormValues]);

  const onChangeHandler = (e) => {
    if (props.type === "okr") {
      setCreateOkrFormValues((state) => ({
        ...state,
        [e.target.name]: e.target.value,
      }));
    } else {
      setCreateTeamFormValues((state) => ({
        ...state,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const { showBoundary } = useErrorBoundary([]);

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

    let createFormData =
      props.type === "okr" ? createOkrFormValues : createTeamFormValues;
    createFormData.editorUsername = user.username;

    if (props.type === "okr") {
      createFormData.okrOwners = createFormData.okrOwners.map((user) => {
        return { okrOwner: user.label, okrOwnerId: user.id, type: user.type };
      });

      okrService
        .create(createFormData)
        .then((newOkr) => {
          okrAdd(newOkr);
          props.onClose();
          setCreateOkrFormValues({
            okrTitle: "",
            okrOwners: "",
            okrDescription: "",
          });
        })
        .catch((err) => {
          showBoundary(err);
        });
    } else {
      createFormData = createTeamFormValues;
      createFormData.teamManager = {
        managerName: manager.label,
        managerId: manager.id,
        type: manager.type,
      };
      createFormData.teamMembers = teamMembers.map((user) => {
        return { memberName: user.label, memberId: user.id, type: user.type };
      });

      teamsService
        .create(createFormData)
        .then((newTeam) => {
          teamAdd(newTeam);
          props.onClose();
          setCreateOkrFormValues({
            teamName: "",
            teamDescription: "",
          });
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
                value={
                  props.type === "okr"
                    ? createOkrFormValues.okrTitle
                    : createTeamFormValues.teamName
                }
                onChange={onChangeHandler}
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
                  // isMulti
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
                onChange={(value) => (teamMembers = value)}
                createOkrDropdown={true}
                setOkrOwnerValue={(value) =>
                  setCreateOkrFormValues((state) => ({
                    ...state,
                    okrOwners: value,
                  }))
                }
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
                value={
                  props.type === "okr"
                    ? createOkrFormValues.okrDescription
                    : createTeamFormValues.teamDescription
                }
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="create-okr-form-btns-ctr">
            <button style={validateFormStyle} type="submit">
              Create {props.type === "okr" ? "OKR" : "Team"}
            </button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </form>
      </section>
    </main>
  );
}
