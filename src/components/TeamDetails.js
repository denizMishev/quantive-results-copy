import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import * as okrService from "../services/okrService";
import * as teamsService from "../services/teamsService";

import { TeamContext } from "../contexts/TeamContext";

export function TeamDetails() {
  const { selectTeam } = useContext(TeamContext);
  const { teamId } = useParams();
  const [teamOwnedOkrs, setTeamOwnedOkrs] = useState([]);

  let teamOwnedOkrsArray = [];

  const team = selectTeam(teamId);

  useEffect(() => {
    Promise.all([teamsService.getOne(teamId), okrService.getAll()]).then(
      (currentTeamAndAllOkrs) => {
        let teamName = currentTeamAndAllOkrs[0].teamName;
        for (const okr of currentTeamAndAllOkrs[1]) {
          if (okr.okrOwners.includes(teamName)) {
            teamOwnedOkrsArray.push(okr);
          }
        }
        setTeamOwnedOkrs(teamOwnedOkrsArray);
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div id="teams-modal">
        <div id="teams-modal-titles">
          <label id="teams-modal-teamName" htmlFor="teams-modal-teamName">
            Team name
          </label>
          <h4>{team.teamName}</h4>
          <label id="teams-modal-teamManager" htmlFor="teams-modal-teamManager">
            Team Manager
          </label>
          <h4>{team.teamManager}</h4>
        </div>
        <div id="teams-modal-members">
          <label htmlFor="teams-modal-teamMember"></label>
          <ul id="teams-modal-membersList">
            {team.teamMembers?.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
          {(team.teamMembers === undefined ||
            team.teamMembers[0] === undefined) && <p>No members.</p>}
        </div>
        <div id="teams-modal-teamOwnedOkrs">
          <ul id="teams-modal-teamOwnedOkrs-list">
            {teamOwnedOkrs?.map((okr) => (
              <Link
                to={`/okrs/${okr._id}`}
                id="teams-modal-teamOwnedOkrs-list-items"
                key={okr._id}
              >
                {okr.okrTitle}
              </Link>
            ))}
          </ul>
          {!teamOwnedOkrs[0] && <p>This team doesn't own any OKRs</p>}
        </div>
      </div>
    </>
  );
}
