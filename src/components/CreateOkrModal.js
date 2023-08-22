import { useContext, useEffect, useState } from "react";

import { OkrContext } from "../contexts/OkrContext";
import { Dropdown } from "./Dropdown";

import * as okrService from "../services/okrService";
import * as userService from "../services/userService";
import * as teamsService from "../services/teamsService";

export function CreateOkrModal(props) {
  const { okrAdd } = useContext(OkrContext);
  const [dropdownUsersAndTeams, setDropdownUsersAndTeams] = useState([]);
  let owners = "";

  useEffect(() => {
    Promise.all([userService.getAllUsers(), teamsService.getAll()]).then(
      (usersAndTeamsRequests) => {
        let usersAndOrTeamsArray = [];
        if (usersAndTeamsRequests[1].code === 404) {
          for (const user of usersAndTeamsRequests[0]) {
            usersAndOrTeamsArray.push({
              value: user.username.toLowerCase(),
              label: user.username,
              id: user._id,
            });
          }
        } else {
          for (const request of usersAndTeamsRequests) {
            for (const userOrTeam of request) {
              if (userOrTeam.username) {
                usersAndOrTeamsArray.push({
                  value: userOrTeam.username.toLowerCase(),
                  label: userOrTeam.username,
                  id: userOrTeam._id,
                });
              } else if (userOrTeam.teamName) {
                usersAndOrTeamsArray.push({
                  value: userOrTeam.teamName.toLowerCase(),
                  label: userOrTeam.teamName,
                  id: userOrTeam._id,
                });
              }
            }
          }
        }
        setDropdownUsersAndTeams(usersAndOrTeamsArray);
      }
    );
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

    const okrData = Object.fromEntries(new FormData(e.target));
    okrData.okrOwners = owners.map((x) => x.label);
    okrData.okrOwnersIds = owners.map((x) => x.id);

    okrService.create(okrData).then((newOkr) => {
      okrAdd(newOkr);
    });
  };

  return (
    // <section>
    //   <form id="createForm" onSubmit={onSubmit}>
    //     <div>
    //       <h1>Create OKR</h1>
    //     </div>
    //     <div>
    //       <i className="fa-solid fa-plus"></i>
    //       <label htmlFor="okrTitle">OKR Title</label>
    //       <input
    //         name="okrTitle"
    //         type="okrTitle"
    //         placeholder="Enter your OKR Title here"
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="okrTitle">Owner</label>
    //       <Dropdown
    //         isSearchable
    //         isMulti
    //         placeHolder="Select owner/s for your OKR"
    //         options={dropdownUsersAndTeams}
    //         onChange={(value) => (owners = value)}
    //       ></Dropdown>
    //     </div>
    //     <div>
    //       <button className="createBtn">Press Enter to submit</button>
    //     </div>
    //   </form>
    // </section>

    <section class="create-okr-ctr">
      <form onSubmit={onSubmit} class="create-okr-form centered-full-screen">
        <div class="create-okr-form-heading-ctr">
          <div onClick={props.onClose}>
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
          <span>Create objective</span>
          <span>All required fields are marked with an asterisk (*).</span>
        </div>
        <div class="create-okr-form-input-fields-ctr">
          <div class="create-okr-form-input-ctr">
            <label for="">Title*</label>
            <input name="okrTitle" type="text" />
          </div>
          <div class="create-okr-form-input-ctr">
            <label for="">Owner*</label>
            <Dropdown
              isSearchable
              isMulti
              placeHolder="Select owner/s for your OKR"
              options={dropdownUsersAndTeams}
              onChange={(value) => (owners = value)}
            ></Dropdown>
          </div>
          <div class="create-okr-form-input-ctr">
            <label for="">Description*</label>
            <input name="okrDescription" type="text" />
          </div>
        </div>
        <div class="create-okr-form-btns-ctr">
          <button type="submit">Create OKR</button>
          <button onClick={props.onClose}>Cancel</button>
        </div>
      </form>
    </section>
  );
}
