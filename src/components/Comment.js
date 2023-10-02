import { useState } from "react";

import { UpdateOrDeleteModal } from "./UpdateOrDeleteModal";

import { useErrorBoundary } from "react-error-boundary";

import * as commentService from "../services/commentService";

export function Comment({ comment, okrId, renderHandler }) {
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [showDeleteCommentsModal, setShowDeleteCommentsModal] = useState(false);
  const [commentForEditing, setCommentForEditing] = useState({});
  const { showBoundary } = useErrorBoundary([]);

  const editCommentHandler = (e, commentId) => {
    e.stopPropagation();
    commentService
      .getOne(commentId)
      .then((result) => {
        setCommentForEditing(result);
      })
      .catch((err) => {
        showBoundary(err);
      });
    setShowEditCommentModal(true);
    setCommentForEditing({});
  };

  return (
    <li key={comment._id}>
      <div className="okr-detailed-comment">
        <div className="okr-detailed-comment-user-info">
          <div className="okr-detailed-user-box">
            <div id="okr-detailed-img-ctr" className="rounded-img-ctr">
              <svg
                className="rounded-img"
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
            <div className="okr-detailed-user-and-date">
              <span>{comment.user.username}</span>
              <span>
                {new Date(comment._createdOn).toString().slice(4, 21)}
              </span>
            </div>
          </div>
          <div className="okr-detailed-comment-user-action-btns">
            <div
              className="okr-detailed-action-btn-ctr cursor-pointer icon-hover-gray"
              onClick={(e) => editCommentHandler(e, comment._id)}
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
            </div>
            <UpdateOrDeleteModal
              title="Edit comment"
              updateParent={() => renderHandler()}
              commentContent={commentForEditing.text}
              id={commentForEditing._id}
              target={"editComment"}
              okrId={okrId}
              onClose={() => setShowEditCommentModal(false)}
              show={showEditCommentModal}
            />
            <div
              className="okr-detailed-action-btn-ctr cursor-pointer icon-hover-gray"
              onClick={() => setShowDeleteCommentsModal(true)}
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
            </div>
            <UpdateOrDeleteModal
              title="Delete comment?"
              description="Once you delete this comment, users will not be able to see it anymore."
              updateParent={() => renderHandler()}
              target={"comment"}
              id={comment._id}
              onClose={() => setShowDeleteCommentsModal(false)}
              show={showDeleteCommentsModal}
            />
          </div>
        </div>
        <div className="okr-detailed-comment-content">
          <p className="comment-content">{comment.text}</p>
        </div>
      </div>
    </li>
  );
}
