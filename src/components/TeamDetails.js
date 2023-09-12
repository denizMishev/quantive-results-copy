import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { TeamChip } from "./team-chip";
import { EditModal } from "./EditModal";
import { UpdateOrDeleteModal } from "./UpdateOrDeleteModal";

import * as teamsService from "../services/teamsService";
import * as okrService from "../services/okrService";

export function TeamDetails() {
  const { teamId } = useParams();

  const [showEditModal, setShowEditModal] = useState(false);
  const [team, setTeam] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teamOwnedOkrs, setTeamOwnedOkrs] = useState([]);
  const totalOkrs = useRef(0);

  let teamOwnedOkrsArray = [];

  useEffect(() => {
    teamsService.getOne(teamId).then((result) => {
      setTeam(result);
    });
    // eslint-disable-next-line
  }, [showEditModal]);

  useEffect(() => {
    okrService.getAll().then((allOkrs) => {
      for (const okr of allOkrs) {
        totalOkrs.current = allOkrs.length;
        for (const okrOwner of okr.okrOwners) {
          if (okrOwner.okrOwnerId === teamId) {
            teamOwnedOkrsArray.push(okr);
          }
        }
      }
      setTeamOwnedOkrs(teamOwnedOkrsArray);
    });
    // eslint-disable-next-line
  }, []);

  let teamCreationDate = new Date(team._createdOn).toString().slice(4, 15);

  let percentageOwnedByTeam = undefined;

  if (totalOkrs.current !== 0 && teamOwnedOkrs.length !== 0) {
    percentageOwnedByTeam =
      Math.trunc((teamOwnedOkrs.length / totalOkrs.current) * 100) + "%";
  }

  return (
    <main id="main" className="main-content">
      <section className="okr-detailed">
        <div className="okr-detailed-ctr">
          <header className="okr-detailed-topbar">
            <Link className="okr-detailed-topbar-link-home" to="/home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </Link>
            <div>
              <div
                onClick={() => setShowEditModal(true)}
                className="okr-detailed-topbar-user-action-icons"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                  />
                </svg>
                <EditModal
                  type={"team"}
                  currentTarget={team}
                  onClose={() => setShowEditModal(false)}
                  show={showEditModal}
                />
              </div>
              <div
                className="okr-detailed-topbar-user-action-icons"
                onClick={() => setShowDeleteModal(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                  />
                </svg>
                <UpdateOrDeleteModal
                  title="Delete Team?"
                  description="Deletion of Teams is permanent and irreversible. Please proceed with caution."
                  target={"team"}
                  id={teamId}
                  onClose={() => setShowDeleteModal(false)}
                  show={showDeleteModal}
                />
              </div>
            </div>
          </header>
          <div className="okr-detailed-main-ctr teams-detailed-main-ctr">
            <div className="okr-detailed-heading-ctr">
              <div className="welcome-banner-img-ctr teams-team-img-ctr teams-detailed-img-ctr">
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
              <span>{team.teamName}</span>
            </div>
            <div className="okr-detailed-field-ctr">
              <label htmlFor="">Created </label>
              <input
                type="text"
                placeholder="-"
                defaultValue={
                  teamCreationDate.length !== 8 ? teamCreationDate : ""
                }
              />
            </div>
            <div className="okr-detailed-fields">
              <div className="okr-detailed-field-ctr">
                <label htmlFor="">Manager</label>
                <div className="welcome-banner-txt-ctr-teams-ctr okr-detailed-owners-field">
                  <ul>
                    <TeamChip
                      title={team.teamManager?.managerName}
                      type={team.teamManager?.type}
                    />
                  </ul>
                </div>
              </div>
              <div className="okr-detailed-field-ctr">
                <label htmlFor="">Members</label>
                <div className="welcome-banner-txt-ctr-teams-ctr okr-detailed-owners-field">
                  <ul>
                    {team.teamMembers?.map((teamMember) => (
                      <TeamChip
                        key={teamMember.memberId}
                        title={teamMember.memberName}
                        type={teamMember.type}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <div className="okr-detailed-field-ctr">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  placeholder="-"
                  defaultValue={team.teamDescription}
                />
              </div>
            </div>
          </div>
          <div className="team-detailed-team-achievements-ctr">
            <p className="team-achievements-p">Team ownership</p>
            <div className="team-achievements-okrs-owned-ctr">
              <div className="okrs-owned-header">
                <div className="okr-svg-ctr">
                  <svg
                    className="okr-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                    />
                  </svg>
                </div>
                <span className="okrs-owned-header-title">
                  OKRs owned by team
                </span>
              </div>
              <div className="okrs-owned-number-ctr">
                <span>{teamOwnedOkrs?.length}</span>
              </div>
              <div className="okrs-owned-percentage-ctr">
                <span className="okrs-owned-percentage-span">
                  {percentageOwnedByTeam ? percentageOwnedByTeam : ""} for the
                  company
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
