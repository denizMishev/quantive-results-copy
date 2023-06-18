import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OkrContext } from "../contexts/OkrContext";

import * as okrService from "../services/okrService";

export function Modal(props) {
  const okrId = props.id;
  const { okrRemove } = useContext(OkrContext);
  const navigate = useNavigate();

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  if (!props.show) {
    return null;
  }

  const deleteHandler = () => {
    okrService.remove(okrId).then(() => {
      okrRemove(okrId);
      navigate("/");
    });
  };

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">{props.description}</div>
        <div className="modal-footer">
          <button onClick={deleteHandler} className="modal-button">
            Delete OKR
          </button>
          <button onClick={props.onClose} className="modal-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
