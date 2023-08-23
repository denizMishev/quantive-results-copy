import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TeamContext } from "../contexts/TeamContext";
import { Dropdown } from "./Dropdown";

import * as userService from "../services/userService";
import * as teamService from "../services/teamsService";

export function CreateTeam() {
  const { teamAdd } = useContext(TeamContext);
  const navigate = useNavigate();
  const [dropdownUsers, setDropdownUsers] = useState([]);
  let manager = "";
  let members = "";

  useEffect(() => {
    userService.getAllUsers().then((users) => {
      let arr = [];
      for (const user of users) {
        arr.push({
          value: user.username.toLowerCase(),
          label: user.username,
          id: user._ownerId,
        });
      }
      setDropdownUsers(arr);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const teamData = Object.fromEntries(new FormData(e.target));
    const teamMembersArray = [];
    for (const member of members) {
      teamMembersArray.push({
        memberName: member.label,
        memberId: member.id,
      });
    }
    const teamManagerObject = {
      managerName: manager.label,
      managerId: manager.id,
    };

    teamData.teamMembers = teamMembersArray;
    teamData.teamManager = teamManagerObject;

    teamService.create(teamData).then((newTeam) => {
      teamAdd(newTeam);
    });
    navigate("/teams");
  };

  return (
    <section>
      <form id="createForm" onSubmit={onSubmit}>
        <div>
          <h1>Create Team</h1>
        </div>
        <div>
          <i className="fa-solid fa-plus"></i>
          <label htmlFor="createTeam-name-label">Team name</label>
          <input
            name="teamName"
            type="teamName"
            placeholder="Enter your Team name here"
          />
        </div>
        <div>
          <label htmlFor="teamManager">Team manager</label>
          <Dropdown
            isSearchable
            placeHolder="Select Team manager for your Team"
            options={dropdownUsers}
            onChange={(value) => (manager = value)}
          ></Dropdown>
        </div>
        <div>
          <label htmlFor="teamMembers">Add Team members</label>
          <Dropdown
            isSearchable
            isMulti
            placeHolder="Select members for your Team"
            options={dropdownUsers}
            onChange={(value) => (members = value)}
          ></Dropdown>
        </div>
        <div>
          <button className="createBtn">Press Enter to submit</button>
        </div>
      </form>
    </section>
  );
}
