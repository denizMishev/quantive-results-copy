import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { OkrContext } from "../contexts/OkrContext";

import * as okrService from "../services/okrService";

export function OkrDetails() {
  const navigate = useNavigate();
  const { okrId } = useParams();
  const { selectOkr, okrRemove } = useContext(OkrContext);

  const okr = selectOkr(okrId);

  const okrDeleteHandler = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this OKR?"
    );

    if (confirmation) {
      okrService.remove(okrId).then(() => {
        okrRemove(okrId);
        navigate("/");
      });
    }
  };

  return (
    <div id="details-modal" action="">
      <div>OKR Title</div>
      <input type="text" defaultValue={okr.okrTitle} />
      <div>Owner</div>
      <input type="text" defaultValue={okr.okrOwners.join(", ")} />
      <Link to={`/okrs/${okrId}/edit`}>Edit OKR</Link>
      <button onClick={okrDeleteHandler}>Delete OKR</button>
    </div>
  );
}
