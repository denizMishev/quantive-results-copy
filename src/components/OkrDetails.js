import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Modal } from "./Modal";

import * as okrService from "../services/okrService";

export function OkrDetails() {
  const [show, setShow] = useState(false);
  const { okrId } = useParams();

  const [okr, setOkr] = useState({});
  useEffect(() => {
    okrService.getOne(okrId).then((result) => {
      setOkr(result);
    });
    // eslint-disable-next-line
  }, []);

  let owners = "";
  if (okr.okrOwners) {
    owners = okr.okrOwners.join(", ");
  }

  return (
    <div id="details-modal" action="">
      <div>OKR Title</div>
      <input type="text" defaultValue={okr.okrTitle} />
      <div>Owner</div>
      <input type="text" defaultValue={owners} />
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
