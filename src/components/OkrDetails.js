import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Modal } from "./Modal";

import * as okrService from "../services/okrService";
import * as commentService from "../services/commentService";

export function OkrDetails() {
  const [show, setShow] = useState(false);
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
              <button>Edit</button>
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
