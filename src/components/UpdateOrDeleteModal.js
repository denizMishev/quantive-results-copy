import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OkrContext } from "../contexts/OkrContext";

import * as okrService from "../services/okrService";
import * as teamsService from "../services/teamsService";
import * as commentService from "../services/commentService";

import { TeamContext } from "../contexts/TeamContext";

export function UpdateOrDeleteModal(props) {
  const targetId = props.id;
  const { okrRemove } = useContext(OkrContext);
  const { teamRemove } = useContext(TeamContext);
  const [commentText, setCommentText] = useState("");
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

  const actionHandler = () => {
    if (props.target === "OKR") {
      okrService.remove(targetId).then(() => {
        okrRemove(targetId);
        navigate("/home");
      });
    }
    if (props.target === "team") {
      teamsService.remove(targetId).then(() => {
        teamRemove(targetId);
        navigate("/home");
      });
    }
    if (props.target === "comment") {
      commentService.remove(targetId);
      setTimeout(() => {
        props.updateParent();
      }, 1);
      props.onClose();
    }
    if (props.target === "editComment") {
      commentService.updateComment(targetId, props.okrId, commentText);
      props.updateParent();
      props.onClose();
    }
  };

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div
          onClick={props.onClose}
          className="modal-close-icon cursor-pointer icon-hover-gray"
        >
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
        </div>
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">
          {props.target === "editComment" ? (
            <input
              type="text"
              className="edit-comment-input"
              value={commentText ? commentText : props.commentContent}
              onChange={(e) => setCommentText(e.target.value)}
            />
          ) : (
            props.description
          )}
        </div>
        <div className="modal-footer">
          <button
            onClick={actionHandler}
            className="create-button delete-modal-button"
          >
            {props.target === "editComment" ? "Submit" : "Delete"}
          </button>
          <button
            onClick={props.onClose}
            className="create-button close-modal-button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
