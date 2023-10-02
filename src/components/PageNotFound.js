import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { Link } from "react-router-dom";

export function PageNotFound() {
  let homePage = "/home";

  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    homePage = "/";
  }

  return (
    <main className="not-found-main">
      <section className="not-found-ctr">
        <p>The page you're looking for doesn't exist.</p>
        <p>
          Back to{" "}
          <Link className="not-found-home-link" to={homePage}>
            Home?
          </Link>
        </p>
      </section>
    </main>
  );
}
