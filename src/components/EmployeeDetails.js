import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import * as userService from "../services/userService";
import * as okrService from "../services/okrService";
import * as teamsService from "../services/teamsService";

export function EmployeeDetails() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState({});
  const [employeeTeams, setEmployeeTeams] = useState([]);
  const [employeeOwnedOkrs, setEmployeeOwnedOkrs] = useState([]);

  let employeeOwnedOkrsArray = [];
  let employeeTeamsArray = [];

  useEffect(() => {
    userService.getOne(employeeId).then((employee) => {
      setEmployee(employee);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    okrService.getAll().then((allOkrs) => {
      for (const okr of allOkrs) {
        if (okr.okrOwnersIds.includes(employeeId)) {
          employeeOwnedOkrsArray.push(okr);
        }
      }
      setEmployeeOwnedOkrs(employeeOwnedOkrsArray);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    teamsService.getAll().then((allTeams) => {
      for (const team of allTeams) {
        if (team.teamManager.managerId === employeeId) {
          employeeTeamsArray.push(team);
        }
        for (const membersOfTeam of team.teamMembers) {
          if (membersOfTeam.memberId === employeeId) {
            employeeTeamsArray.push(team);
          }
        }
      }
      setEmployeeTeams(employeeTeamsArray);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div id="employee-details-modal">
        <div id="employee-details-name">
          <h2>{employee.username}</h2>
        </div>
        <div id="employee-details-about">
          <span id="employee-details-dateJoinedSpan">
            date joined: {new Date(employee._createdOn).toString().slice(4, 15)}
          </span>
          <span id="employee-details-okrsOwnedSpan">
            okrs owned: {employeeOwnedOkrs.length}
          </span>
        </div>
        <div id="employee-details-okrsOwned">
          <ul id="employee-modal-ownedOkrs-list">
            {employeeOwnedOkrs?.map((okr) => (
              <Link
                to={`/okrs/${okr._id}`}
                id="employee-modal-employeeOwnedOkrs-list-items"
                key={okr._id}
              >
                {okr.okrTitle}
              </Link>
            ))}
          </ul>
          {!employeeOwnedOkrs[0] && <p>This employee doesn't own any OKRs</p>}
        </div>
        <div id="employee-details-teams">
          <ul id="employee-modal-teams-list">
            {employeeTeams?.map((team) => (
              <Link
                to={`/teams/${team._id}`}
                id="employee-modal-employeeOwnedOkrs-list-items"
                key={team._id}
              >
                {team.teamName}
              </Link>
            ))}
          </ul>
          {!employeeTeams[0] && <p>This employee is not a part of any teams</p>}
        </div>
      </div>
    </>
  );
}
