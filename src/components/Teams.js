import { useState, useEffect } from "react";

import * as teamService from "../services/teamsService";

import { Link } from "react-router-dom";
import { CreateModal } from "./CreateModal";

export function Teams() {
  const [showCreateTeamsModal, setShowCreateTeamsModal] = useState(false);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    teamService.getAll().then((result) => {
      if (result.code === 404) {
        return;
      } else {
        setTeams(result);
      }
    });
  }, [showCreateTeamsModal]);

  return (
    <main id="main" className="main-content">
      <section className="teams">
        <header className="section-header home-header">
          <h2>Teams</h2>
          <div className="section-header-buttons-ctr">
            <div>
              <button
                onClick={() => setShowCreateTeamsModal(true)}
                className="create-button"
              >
                Create Team
              </button>
              <CreateModal
                type="team"
                onClose={() => setShowCreateTeamsModal(false)}
                show={showCreateTeamsModal}
              />
            </div>
            <hr className="buttons-ctr-linebreak" />
            <div className="input-search-ctr">
              <input id="input-search" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                />
              </svg>
            </div>
          </div>
        </header>
        <section className="teams-list">
          <div className="teams-ctr ">
            {teams.length > 0 ? (
              <ul className="myokrs-grid-content teams-grid-content">
                <li className="myokrs-header teams-header">
                  <div className="">
                    <span>Name</span>
                  </div>
                  <div className="">
                    <span>Description</span>
                  </div>
                </li>
                {teams.map((team) => (
                  <li key={team._id} className="myokrs-okr teams-list-team">
                    <div className="myokrs-okr-title-ctr teams-team-title-members-ctr">
                      <div className="welcome-banner-img-ctr teams-team-img-ctr">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 640 512"
                        >
                          <path
                            fill="currentColor"
                            d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z"
                          />
                        </svg>
                      </div>
                      <div className="teams-team-title-members">
                        <Link
                          className="teams-team-title-members-link"
                          to={`/teams/${team._id}`}
                        >
                          <h3>{team.teamName}</h3>
                          <span>
                            {team.teamMembers.length + 1} members, lead by{" "}
                            {team.teamManager.managerName}
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className="myokrs-okr-owner-ctr teams-team-description">
                      <p>John Doe</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="teams-no-content">
                <p>No teams to show yet.</p>
                <p>
                  When there are teams in your account, they will be shown here.
                </p>
                <button className="create-button">Create Team</button>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
