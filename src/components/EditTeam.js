import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Dropdown } from "./Dropdown";

import * as userService from "../services/userService";
import * as teamsService from "../services/teamsService";
import { TeamContext } from "../contexts/TeamContext";

export function EditTeam() {
  const { teamId } = useParams();
  const { teamEdit } = useContext(TeamContext);

  const [dropdownUsers, setDropdownUsers] = useState([]);
  const [team, setTeam] = useState({});

  const navigate = useNavigate();

  let newManager = "";
  let newMembers = "";

  useEffect(() => {
    userService.getAllUsers().then((users) => {
      let dropdownUsersArray = [];
      for (const user of users) {
        dropdownUsersArray.push({
          value: user.username.toLowerCase(),
          label: user.username,
          id: user._id,
        });
      }
      setDropdownUsers(dropdownUsersArray);
    });
  }, []);

  useEffect(() => {
    teamsService.getOne(teamId).then((result) => {
      setTeam(result);
    });
    // eslint-disable-next-line
  }, []);

  let currentMembers = "";
  if (team.teamMembers) {
    let teamMembersNamesArray = [];
    for (const member of team.teamMembers) {
      teamMembersNamesArray.push(member.memberName);
    }
    currentMembers = teamMembersNamesArray.join(", ");
  }

  let currentManager = "";
  if (team.teamManager) {
    currentManager = team.teamManager.managerName;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const teamData = Object.fromEntries(new FormData(e.target));

    if (!newManager) {
      teamData.teamManager = team.teamManager;
    } else {
      teamData.teamManager = {
        managerName: newManager.label,
        managerId: newManager.id,
      };
    }

    if (newMembers.length === 0) {
      teamData.teamMembers = team.teamMembers;
    } else {
      const newTeamMembersArray = [];
      for (const newMember of newMembers) {
        newTeamMembersArray.push({
          memberName: newMember.label,
          memberId: newMember.id,
        });
      }
      teamData.teamMembers = newTeamMembersArray;
    }

    teamsService.edit(teamId, teamData).then((result) => {
      teamEdit(teamId, result);
      navigate(`/teams/${teamId}`);
    });
  };

  return (
    <section>
      <form id="createForm" onSubmit={onSubmit}>
        <div>
          <h1>Edit Team</h1>
        </div>
        <div>
          <i className="fa-solid fa-pencil"></i>
          <label htmlFor="teamName">Edit Team name</label>
          <input name="teamName" type="teamName" defaultValue={team.teamName} />
        </div>
        <div>
          <label htmlFor="teamManager">Edit Team manager</label>
          <Dropdown
            isSearchable
            placeHolder={currentManager}
            options={dropdownUsers}
            onChange={(value) => (newManager = value)}
          ></Dropdown>
        </div>
        <div>
          <label htmlFor="teamManager">Edit Team members</label>
          <Dropdown
            isSearchable
            isMulti
            placeHolder={currentMembers}
            options={dropdownUsers}
            onChange={(value) => (newMembers = value)}
          ></Dropdown>
        </div>
        <div>
          <button className="createBtn">Press Enter to submit editing</button>
        </div>
      </form>
    </section>
  );
}
