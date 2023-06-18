import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { OkrContext } from "../contexts/OkrContext";

import { Modal } from "./Modal";

import * as okrService from "../services/okrService";

export function OkrDetails() {
  const [show, setShow] = useState(false);
  const { okrId } = useParams();
  const { selectOkr, okrRemove } = useContext(OkrContext);

  const okr = selectOkr(okrId);
  console.log(okr);
  console.log(okr.okrOwners);
  return (
    <div id="details-modal" action="">
      <div>OKR Title</div>
      <input type="text" defaultValue={okr.okrTitle} />
      <div>Owner</div>
      <input type="text" defaultValue={okr.okrOwners.join(", ")} />
      <Link to={`/okrs/${okrId}/edit`}>Edit OKR</Link>
      <button onClick={() => setShow(true)}>Delete OKR</button>
      <Modal
        title="Are you sure you want to delete this OKR?"
        description="Deletion of OKRs is permanent and irreversible"
        id={okrId}
        onClose={() => setShow(false)}
        show={show}
      />
    </div>
  );
}
