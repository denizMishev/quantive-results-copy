import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import * as teamService from "../services/teamsService";

export function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    teamService.getAll().then((result) => {
      if (result.code === 404) {
        return;
      } else {
        setTeams(result);
      }
    });
  }, []);

  return (
    <div id="teams-main">
      <header id="teams-header">
        Teams
        <Link to="/teams/create" id="teams-addTeam-btn">
          Add new team
        </Link>
      </header>
      <div id="teams-container">
        <ul id="teams-container-list">
          {teams?.map((team) => (
            <Link to={`/teams/${team._id}`} id="teams-team-card" key={team._id}>
              {team.teamName} - Managed by {team.teamManager.managerName}
            </Link>
          ))}
        </ul>
        {!teams[0] && <p>No teams.</p>}
      </div>
    </div>
  );
}
