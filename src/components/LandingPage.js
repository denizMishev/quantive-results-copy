import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <header className="landing-page-header">
        <div className="landing-page-logo-ctr">
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
          <h1>Team OKRs</h1>
        </div>
      </header>
      <main className="landing-page-main">
        <div className="landing-page-headings">
          <h2>The best product for making your company the best</h2>
          <h3>
            It has all the tools you need to make your business successful.
          </h3>
          <div className="landing-page-user-btns">
            <button className="user-form-btn">
              <Link to="/login">
                Login <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </button>
            <button className="user-form-btn">
              <Link to="/register">Sign up</Link>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
