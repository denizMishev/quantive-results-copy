import { useContext, useEffect, useState } from "react";

import { OkrContext } from "../contexts/OkrContext";
import { Dropdown } from "./Dropdown";

import * as okrService from "../services/okrService";
import * as userService from "../services/userService";
import * as teamsService from "../services/teamsService";

export function CreateOkr() {
  const { okrAdd } = useContext(OkrContext);
  const [dropdownUsers, setDropdownUsers] = useState([]);
  let owners = "";

  useEffect(() => {
    Promise.all([userService.getAllUsers(), teamsService.getAll()]).then(
      (result) => {
        let arr = [];
        for (const request of result) {
          for (const userOrTeam of request) {
            if (userOrTeam.username) {
              arr.push({
                value: userOrTeam.username.toLowerCase(),
                label: userOrTeam.username,
                id: userOrTeam._id,
              });
            } else if (userOrTeam.teamName) {
              arr.push({
                value: userOrTeam.teamName.toLowerCase(),
                label: userOrTeam.teamName,
                id: userOrTeam._id,
              });
            }
          }
        }
        setDropdownUsers(arr);
      }
    );
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const okrData = Object.fromEntries(new FormData(e.target));
    okrData.okrOwners = owners.map((x) => x.label);
    okrData.okrOwnersIds = owners.map((x) => x.id);

    okrService.create(okrData).then((result) => {
      okrAdd(result);
      console.log(result);
    });
  };

  return (
    <section>
      <form id="createForm" onSubmit={onSubmit}>
        <div>
          <h1>Create OKR</h1>
        </div>
        <div>
          <i className="fa-solid fa-plus"></i>
          <label htmlFor="okrTitle">OKR Title</label>
          <input
            name="okrTitle"
            type="okrTitle"
            placeholder="Enter your OKR Title here"
          />
        </div>
        <div>
          <label htmlFor="okrTitle">Owner</label>
          <Dropdown
            isSearchable
            isMulti
            placeHolder="Select owner/s for your OKR"
            options={dropdownUsers}
            onChange={(value) => (owners = value)}
          ></Dropdown>
        </div>
        <div>
          <button className="createBtn">Press Enter to submit</button>
        </div>
      </form>
    </section>
  );
}
