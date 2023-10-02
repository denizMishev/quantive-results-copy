import { useEffect, useState } from "react";
import * as teamService from "../services/teamsService";
import { useErrorBoundary } from "react-error-boundary";

import { Link } from "react-router-dom";
import { TeamChip } from "./team-chip";

export function Employee({ currentId, username }) {
  const [employeeTeams, setEmployeeTeams] = useState([]);

  let employeesTeamsArray = [];

  const { showBoundary } = useErrorBoundary([]);

  useEffect(() => {
    teamService
      .getAll()
      .then((allTeams) => {
        for (const team of allTeams) {
          if (team.teamManager.managerId === currentId) {
            employeesTeamsArray.push(team);
          }
          for (const member of team.teamMembers) {
            if (member.memberId === currentId) {
              employeesTeamsArray.push(team);
            }
          }
        }
        setEmployeeTeams(employeesTeamsArray);
      })
      .catch((err) => {
        showBoundary(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <li id="employees-list-li" className="myokrs-okr teams-list-team">
      <Link
        className="employees-employee-title-ctr"
        to={`/employees/${currentId}`}
      >
        <div className="myokrs-okr-title-ctr employees-title-ctr">
          <div className="welcome-banner-img-ctr teams-team-img-ctr">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M528 160V416c0 8.8-7.2 16-16 16H320c0-44.2-35.8-80-80-80H176c-44.2 0-80 35.8-80 80H64c-8.8 0-16-7.2-16-16V160H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM272 256a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm104-48c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376z"
              />
            </svg>
          </div>
          <div className="teams-team-title-members">
            <h3>{username}</h3>
          </div>
        </div>
      </Link>
      <div className="myokrs-okr-owner-ctr teams-team-description">
        <ul className="employee-teams">
          {employeeTeams.map((team) => (
            <Link to={`/teams/${team._id}`}>
              <TeamChip
                key={team._id}
                type={"team"}
                title={team.teamName}
                currentId={team._id}
                renderLocation={"employees"}
              />
            </Link>
          ))}
        </ul>
      </div>
    </li>
  );
}
