import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Okr } from "./Okr";
import { TeamChip } from "./team-chip";
import { CreateOkrModal } from "./CreateOkrModal";

import { OkrContext } from "../contexts/OkrContext";
import { AuthContext } from "../contexts/AuthContext";

import * as teamsService from "../services/teamsService";
import * as okrService from "../services/okrService";

export function Home() {
  const { okrs } = useContext(OkrContext);
  const { user } = useContext(AuthContext);

  const [showCreateOkrModal, setShowCreateOkrModal] = useState(false);
  const [employeeManagedTeams, setEmployeeManagedTeams] = useState({});
  const [employeeTeams, setEmployeeTeams] = useState({});
  const [employeeOwnedOkrs, setEmployeeOwnedOkrs] = useState([]);

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
    teamsService.getAll().then((allTeams) => {
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
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    okrService.getAll().then((allOkrs) => {
      for (const okr of allOkrs) {
        if (okr.okrOwnersIds.includes(user._id)) {
          employeeOwnedOkrsArray.push(okr);
        }
      }
      setEmployeeOwnedOkrs(employeeOwnedOkrsArray);
    });
    // eslint-disable-next-line
  }, []);

  return (
    // <section id="homeSection">
    //   <div id="homePage">
    //     {okrs.length > 0 ? (
    //       okrs.map((x) => <Okr key={x._id} okr={x} />)
    //     ) : (
    //       <span>You don't have any OKRs assigned to you yet.</span>
    //     )}
    //   </div>
    // </section>

    //welcome-banner-txt-ctr-teams-ctr

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
              <CreateOkrModal
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
              <ul>
                <li>
                  {employeeManagedTeams.length > 0
                    ? employeeManagedTeams.map((team) => (
                        <TeamChip key={team._id} currentTeam={team} />
                      ))
                    : ""}
                </li>
              </ul>
            </div>
            <div
              style={hideMemberTeamsStyle}
              className="welcome-banner-txt-ctr-teams-ctr"
            >
              <span>Member of:</span>
              <ul>
                <li>
                  {employeeTeams.length > 0
                    ? employeeTeams.map((team) => (
                        <TeamChip key={team._id} currentTeam={team} />
                      ))
                    : ""}
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="home-myokrs">
          <div className="myokrs-ctr">
            <ul className="myokrs-grid-content">
              <li className="myokrs-header">
                <div className="">
                  <span>My OKRs</span>
                </div>
                <div className="">
                  <span>Owners</span>
                </div>
                <div className="">
                  <span>Description</span>
                </div>
                <div>
                  <span>OKR State</span>
                </div>
              </li>
              {employeeOwnedOkrs.length > 0 ? (
                okrs.map((okr) => <Okr key={okr._id} currentOkr={okr} />)
              ) : (
                <span>You don't have any OKRs assigned to you yet.</span>
              )}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
