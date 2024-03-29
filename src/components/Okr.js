import { Link } from "react-router-dom";

export function Okr({ currentOkr, page }) {
  return (
    <li
      style={
        page === "okrsPage" ? { gridAutoColumns: "1fr 1fr 1fr 0.5fr" } : {}
      }
      id="okrs-list-li"
      className="myokrs-okr"
    >
      <div
        style={page !== "okrsPage" ? { minWidth: "20.85rem" } : {}}
        className="myokrs-okr-title-ctr"
      >
        <div className="myokrs-svg-ctr">
          <svg
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
        <Link to={`/okrs/${currentOkr._id}`}>
          <span>{currentOkr.okrTitle}</span>
        </Link>
      </div>
      {page === "okrsPage" ? (
        <div className="myokrs-okr-owner-ctr">
          <span>
            {currentOkr.okrOwners.map((owner) => owner.okrOwner).join(", ")}
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="myokrs-okr-description-ctr">
        <span>{currentOkr.okrDescription}</span>
      </div>
    </li>
  );
}
