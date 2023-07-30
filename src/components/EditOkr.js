import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Dropdown } from "./Dropdown";

import * as okrService from "../services/okrService";
import * as userService from "../services/userService";
import * as teamsService from "../services/teamsService";
import { OkrContext } from "../contexts/OkrContext";

export function EditOkr() {
  const [dropdownUsersAndTeams, setDropdownUsersAndTeams] = useState([]);
  const { okrEdit } = useContext(OkrContext);
  const { okrId } = useParams();
  const navigate = useNavigate();
  let owners = "";

  useEffect(() => {
    Promise.all([userService.getAllUsers(), teamsService.getAll()]).then(
      (usersAndTeamsRequests) => {
        let usersAndTeamsArray = [];
        for (const request of usersAndTeamsRequests) {
          for (const userOrTeam of request) {
            if (userOrTeam.username) {
              usersAndTeamsArray.push({
                value: userOrTeam.username.toLowerCase(),
                label: userOrTeam.username,
              });
            } else if (userOrTeam.teamName) {
              usersAndTeamsArray.push({
                value: userOrTeam.teamName.toLowerCase(),
                label: userOrTeam.teamName,
              });
            }
          }
        }
        setDropdownUsersAndTeams(usersAndTeamsArray);
      }
    );
  });

  const [okr, setOkr] = useState({});
  useEffect(() => {
    okrService.getOne(okrId).then((result) => {
      setOkr(result);
    });
    // eslint-disable-next-line
  }, []);

  let currentOwners = "";
  if (okr.okrOwners) {
    currentOwners = okr.okrOwners.join(", ");
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const okrData = Object.fromEntries(new FormData(e.target));
    const newOwnersArray = owners.map((x) => x.label);

    if (newOwnersArray.length === 0) {
      const previousOwnersArr = [currentOwners];
      okrData.okrOwners = previousOwnersArr;
    } else {
      okrData.okrOwners = newOwnersArray;
    }

    okrService.edit(okrId, okrData).then((editedOkr) => {
      okrEdit(okrId, editedOkr);
      navigate(`/okrs/${okrId}`);
    });
  };

  return (
    <section>
      <form id="createForm" onSubmit={onSubmit}>
        <div>
          <h1>Edit OKR</h1>
        </div>
        <div>
          <i className="fa-solid fa-pencil"></i>
          <label htmlFor="okrTitle">Edit OKR Title</label>
          <input name="okrTitle" type="okrTitle" defaultValue={okr.okrTitle} />
        </div>
        <div>
          <label htmlFor="okrTitle">Owner</label>
          <Dropdown
            isSearchable
            isMulti
            placeHolder={currentOwners}
            options={dropdownUsersAndTeams}
            onChange={(value) => (owners = value)}
          ></Dropdown>
        </div>
        <div>
          <button className="createBtn">Press Enter to submit editing</button>
        </div>
      </form>
    </section>
  );
}
