import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as teamsService from "../services/teamsService";

export function TeamDetails() {
  const { teamId } = useParams();
  const [team, setTeam] = useState({});
  let members = "";

  useEffect(() => {
    teamsService.getOne(teamId).then((result) => {
      setTeam(result);
    });
    // eslint-disable-next-line
  }, []);

  if (team.teamMembers) {
    members = team.teamMembers.join(", ");
  }

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
      </div>
    </>
  );
}
