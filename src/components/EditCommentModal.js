import { useState, useEffect } from "react";

import * as commentService from "../services/commentService";

export function EditCommentModal(props) {
  const currentCommentId = props.id;
  const currentCommentOkrId = props.okrId;
  const [commentText, setCommentText] = useState("");

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

  const submitEditingHandler = () => {
    commentService.updateComment(
      currentCommentId,
      currentCommentOkrId,
      commentText
    );
    props.updateParent();
    props.onClose();
  };

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={commentText ? commentText : props.commentContent}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button onClick={submitEditingHandler} className="modal-button">
            Submit editing
          </button>
          <button onClick={props.onClose} className="modal-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
