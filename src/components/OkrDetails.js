import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

import { AuthContext } from "../contexts/AuthContext";

import { UpdateOrDeleteModal } from "./UpdateOrDeleteModal";
import { EditModal } from "./EditModal";
import { Comment } from "./Comment";
import { TeamChip } from "./team-chip";
import { Link } from "react-router-dom";

import * as okrService from "../services/okrService";
import * as commentService from "../services/commentService";

export function OkrDetails() {
  const { user } = useContext(AuthContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { okrId } = useParams();

  const [okr, setOkr] = useState({});
  const [comments, setComments] = useState([]);

  const { showBoundary } = useErrorBoundary([]);

  useEffect(() => {
    okrService.getOne(okrId).then((result) => {
      setOkr(result);
    });
    // eslint-disable-next-line
  }, [showEditModal]);

  const addCommentHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const comment = formData.get("comment");

    commentService.create(okrId, comment);
    setTimeout(() => {
      commentService.getByOkrId(okrId).then((result) => {
        setComments(result);
      });
    }, 1);
  };

  useEffect(() => {
    commentService
      .getByOkrId(okrId)
      .then((result) => {
        setComments(result);
      })
      .catch((err) => {
        showBoundary(err);
      });
    // eslint-disable-next-line
  }, []);

  const renderHandler = () => {
    commentService
      .getByOkrId(okrId)
      .then((result) => {
        setComments(result);
      })
      .catch((err) => {
        showBoundary(err);
      });
  };

  return (
    <main id="main" className="main-content">
      <section className="okr-detailed">
        <div className="okr-detailed-ctr">
          <header className="okr-detailed-topbar">
            <Link className="okr-detailed-topbar-link-home" to="/home">
              <svg
                className="detailed-topbar-svg"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </Link>
            <div>
              {user._id === okr._ownerId && (
                <div
                  onClick={() => setShowEditModal(true)}
                  className="okr-detailed-topbar-user-action-icons"
                >
                  <svg
                    className="detailed-topbar-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                    />
                  </svg>
                  <EditModal
                    type={"okr"}
                    currentTarget={okr}
                    onClose={() => setShowEditModal(false)}
                    show={showEditModal}
                  />
                </div>
              )}
              {user._id === okr._ownerId && (
                <div
                  className="okr-detailed-topbar-user-action-icons"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <svg
                    className="detailed-topbar-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    />
                  </svg>
                  <UpdateOrDeleteModal
                    title="Delete OKR?"
                    description="Deletion of OKRs is permanent and irreversible. Please proceed with caution."
                    target={"OKR"}
                    id={okrId}
                    onClose={() => setShowDeleteModal(false)}
                    show={showDeleteModal}
                  />
                </div>
              )}
            </div>
          </header>
          <div className="okr-detailed-main-ctr">
            <div className="okr-detailed-heading-ctr">
              <div className="okr-svg-ctr">
                <svg
                  className="okr-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                  />
                </svg>
              </div>
              <span>{okr.okrTitle}</span>
            </div>
            <div className="okr-detailed-fields">
              <div className="okr-detailed-field-ctr">
                <label htmlFor="">Editor </label>
                <div className="welcome-banner-txt-ctr-teams-ctr okr-detailed-owners-field">
                  <ul className="okr-detailed-owner-list">
                    <TeamChip title={okr.editorUsername} type={"employee"} />
                  </ul>
                </div>
              </div>
              <div className="okr-detailed-field-ctr">
                <label htmlFor="">Owner</label>
                <div className="welcome-banner-txt-ctr-teams-ctr okr-detailed-owners-field">
                  <ul className="okr-detailed-owner-list">
                    {okr.okrOwners?.map((okrOwner) => (
                      <TeamChip
                        key={okrOwner.okrOwnerId}
                        title={okrOwner.okrOwner}
                        type={okrOwner.type}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <div className="okr-detailed-field-ctr">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  placeholder="-"
                  defaultValue={okr.okrDescription}
                />
              </div>
            </div>
            <div className="okr-detailed-comment-section-header">
              <div className="okr-detailed-comment-img-ctr okr-svg-ctr">
                <svg
                  className="comment-svg okr-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                  />
                </svg>
              </div>
              <span>Comments</span>
            </div>
            <div
              className="okr-detailed-comments-ctr"
              style={{
                visibility: comments.length !== 0 ? "visible" : "hidden",
              }}
            >
              <ul>
                {comments.length > 0 &&
                  comments.map((comment) => (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      okrId={okrId}
                      renderHandler={renderHandler}
                    />
                  ))}
              </ul>
            </div>
            <div
              style={comments.length === 0 ? { marginTop: "0rem" } : {}}
              className="okr-detailed-comment-input-field"
            >
              <form onSubmit={addCommentHandler}>
                <textarea
                  className="okr-detailed-comment-input-text-area"
                  name="comment"
                  placeholder="Comment on OKR"
                ></textarea>
                <button type="submit" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
