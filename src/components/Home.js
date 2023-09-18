import { useContext, useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { Okr } from "./Okr";
import { Link } from "react-router-dom";
import { TeamChip } from "./team-chip";
import { CreateModal } from "./CreateModal";

import { AuthContext } from "../contexts/AuthContext";

import * as teamsService from "../services/teamsService";
import * as okrService from "../services/okrService";

export function Home() {
  const { user } = useContext(AuthContext);

  const [showCreateOkrModal, setShowCreateOkrModal] = useState(false);
  const [employeeManagedTeams, setEmployeeManagedTeams] = useState({});
  const [employeeTeams, setEmployeeTeams] = useState({});
  const [employeeOwnedOkrs, setEmployeeOwnedOkrs] = useState([]);

  const { showBoundary } = useErrorBoundary([]);

  let employeeManagedTeamsArray = [];
  let employeeTeamsArray = [];
  let employeeOwnedOkrsArray = [];

  let hideManagingTeamsStyle = {
    display: "flex",
  };

  let hideMemberTeamsStyle = {
    display: "flex",
  };

  if (
    employeeManagedTeams.length === 0 ||
    employeeManagedTeams.length === undefined
  ) {
    hideManagingTeamsStyle = {
      display: "none",
    };
  }

  if (employeeTeams.length === 0 || employeeTeams.length === undefined) {
    hideMemberTeamsStyle = {
      display: "none",
    };
  }

  useEffect(() => {
    teamsService
      .getAll()
      .then((allTeams) => {
        for (const team of allTeams) {
          if (team.teamManager.managerId === user._id) {
            employeeManagedTeamsArray.push(team);
          } else {
            for (const membersOfTeam of team.teamMembers) {
              if (membersOfTeam.memberId === user._id) {
                employeeTeamsArray.push(team);
              }
            }
          }
        }
        setEmployeeManagedTeams(employeeManagedTeamsArray);
        setEmployeeTeams(employeeTeamsArray);
      })
      .catch((err) => {
        showBoundary(err);
      });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    okrService.getAll().then((allOkrs) => {
      for (const okr of allOkrs) {
        for (const okrOwner of okr.okrOwners) {
          if (okrOwner.okrOwnerId === user._id) {
            employeeOwnedOkrsArray.push(okr);
          }
        }
      }
      setEmployeeOwnedOkrs(employeeOwnedOkrsArray);
    });
    // eslint-disable-next-line
  }, [showCreateOkrModal]);

  return (
    <main id="main" className="main-content">
      <section className="home">
        <header className="section-header home-header">
          <h2>Dashboard</h2>
          <div className="section-header-buttons-ctr">
            <div>
              <button
                className="create-button"
                onClick={() => setShowCreateOkrModal(true)}
              >
                Create OKR
              </button>
              <CreateModal
                type="okr"
                onClose={() => setShowCreateOkrModal(false)}
                show={showCreateOkrModal}
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
        <section className="home-welcome-banner-ctr">
          <div className="welcome-banner-img-ctr">
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
          <div className="welcome-banner-txt-ctr">
            <div className="welcome-banner-txt-ctr-title-ctr">
              <h3>Hi, {user.username}</h3>
            </div>
            <div
              className="welcome-banner-txt-ctr-teams-ctr"
              style={hideManagingTeamsStyle}
            >
              <span>Managing:</span>
              <ul className="welcome-banner-teams-list">
                {employeeManagedTeams.length > 0
                  ? employeeManagedTeams.map((team) => (
                      <Link to={`/teams/${team._id}`}>
                        <TeamChip
                          key={team._id}
                          title={team.teamName}
                          currentId={team._id}
                          type="team"
                        />
                      </Link>
                    ))
                  : ""}
              </ul>
            </div>
            <div
              style={hideMemberTeamsStyle}
              className="welcome-banner-txt-ctr-teams-ctr"
            >
              <span>Member of:</span>
              <ul className="welcome-banner-txt-ctr-teams-ctr .welcome-banner-teams-list">
                {employeeTeams.length > 0
                  ? employeeTeams.map((team) => (
                      <Link to={`/teams/${team._id}`}>
                        <TeamChip
                          key={team._id}
                          currentTeam={team}
                          title={team.teamName}
                          type="team"
                        />
                      </Link>
                    ))
                  : ""}
              </ul>
            </div>
          </div>
        </section>
        <section className="home-myokrs">
          <div className="myokrs-ctr">
            <ul className="myokrs-grid-content">
              <li id="okrs-list-li-header" className="myokrs-header">
                <div
                  id="home-okrs-list-li-header-title-header"
                  className="okrs-list-li-header-title-header"
                >
                  <span>My OKRs</span>
                </div>
                <div className="">
                  <span>Description</span>
                </div>
              </li>
              {employeeOwnedOkrs.length > 0 ? (
                employeeOwnedOkrs.map((okr) => (
                  <Okr key={okr._id} currentOkr={okr} />
                ))
              ) : (
                <li id="myokrs-no-content">
                  <button
                    onClick={() => setShowCreateOkrModal(true)}
                    className="create-button"
                  >
                    Create OKR
                  </button>
                  <h3>Get inspiration from OKR templates</h3>
                  <h3>Brainstorm your organization's vision and discuss it.</h3>
                </li>
              )}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
