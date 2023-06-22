import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { DeleteModal } from "./DeleteModal";
import { EditCommentModal } from "./EditCommentModal";

import * as okrService from "../services/okrService";
import * as commentService from "../services/commentService";

export function OkrDetails() {
  // const [render, setRender] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentForEditing, setCommentForEditing] = useState({});
  const { okrId } = useParams();

  const [okr, setOkr] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    okrService.getOne(okrId).then((result) => {
      setOkr(result);
    });
    // eslint-disable-next-line
  }, []);
  const addCommentHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const comment = formData.get("comment");

    commentService.create(okrId, comment);
    commentService.getByOkrId(okrId).then((result) => {
      setComments(result);
    });
  };

  useEffect(() => {
    commentService.getByOkrId(okrId).then((result) => {
      setComments(result);
    });
    // eslint-disable-next-line
  }, []);

  const deleteCommentHandler = (commentId) => {
    commentService.remove(commentId);
    setTimeout(() => {
      commentService.getByOkrId(okrId).then((result) => {
        setComments(result);
      });
    }, 1);
  };

  const editCommentHandler = (e, commentId) => {
    e.stopPropagation();
    commentService.getOne(commentId).then((result) => {
      setCommentForEditing(result);
    });
    setShowEditModal(true);
    setCommentForEditing({});
  };

  let owners = "";
  if (okr.okrOwners) {
    owners = okr.okrOwners.join(", ");
  }

  const renderHandler = () => {
    commentService.getByOkrId(okrId).then((result) => {
      setComments(result);
    });
    // setRender(1);
  };

  console.log("rendering");

  return (
    <div id="details-modal" action="">
      <div>OKR Title</div>
      <input type="text" defaultValue={okr.okrTitle} />
      <div>Owner</div>
      <input type="text" defaultValue={owners} />
      <Link to={`/okrs/${okrId}/edit`}>Edit OKR</Link>
      <button onClick={() => setShowDeleteModal(true)}>Delete OKR</button>
      <DeleteModal
        title="Are you sure you want to delete this OKR?"
        description="Deletion of OKRs is permanent and irreversible"
        id={okrId}
        onClose={() => setShowDeleteModal(false)}
        show={showDeleteModal}
      />
      <div id="details-comments">
        <h2 id="details-comments-header">Comments:</h2>
        <ul id="details-comments-list">
          {comments?.map((comment) => (
            <li key={comment._id}>
              {comment.text} - commented by {comment.user.username} - on{" "}
              {new Date(comment._createdOn).toString().slice(4, 21)}
              <button onClick={() => deleteCommentHandler(comment._id)}>
                Delete
              </button>
              <button onClick={(e) => editCommentHandler(e, comment._id)}>
                Edit
              </button>
              <EditCommentModal
                title="Edit comment"
                updateParent={() => renderHandler()}
                id={commentForEditing._id}
                okrId={okrId}
                commentContent={commentForEditing.text}
                onClose={() => setShowEditModal(false)}
                show={showEditModal}
              />
            </li>
          ))}
        </ul>
        {!comments[0] && <p>No comments.</p>}
      </div>
      <article id="details-create-comment">
        <label id="details-create-comment-label" htmlFor="add-comment"></label>
        <form
          id="details-create-comment-form"
          className="form"
          onSubmit={addCommentHandler}
        >
          <textarea
            id="details-create-comment-input-comment"
            cols="30"
            rows="10"
            name="comment"
            placeholder="Comment....."
          ></textarea>
          <input className="btn submit" type="submit" value="Add Comment" />
        </form>
      </article>
    </div>
  );
}
