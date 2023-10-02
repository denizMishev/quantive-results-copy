// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

// import { Link } from "react-router-dom";

// export function NotFound() {
//   let homePage = "/home";

//   const { isAuthenticated } = useContext(AuthContext);

//   if (!isAuthenticated) {
//     homePage = "/";
//   }

//   return (
//     <section>
//       <p>The page you're looking for doesn't exist.</p>
//       <p>
//         Back to <Link to={homePage}>Home</Link>
//       </p>
//     </section>
//   );
// }

import { Navigate } from "react-router-dom";

export function NotFound() {
  return <Navigate to="/404" replace />;
}
