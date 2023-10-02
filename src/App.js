import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { OkrProvider } from "./contexts/OkrContext";
import { TeamProvider } from "./contexts/TeamContext";
import { PrivateGuard } from "./components/common/PrivateGuard";

import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { OkrDetails } from "./components/OkrDetails";
import { Teams } from "./components/Teams";
import { TeamDetails } from "./components/TeamDetails";
import { LandingPage } from "./components/LandingPage";
import { EmployeeDetails } from "./components/EmployeeDetails";
import { Employees } from "./components/Employees";
import { OkrsPage } from "./components/OkrsPage";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandler } from "./components/ErrorHandler";
import { NotFound } from "./components/NotFound";
import { PageNotFound } from "./components/PageNotFound";
import Logout from "./components/Logout";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandler}
      onError={() => console.log("Error happened!")}
    >
      <AuthProvider>
        <div className="App">
          <Navbar></Navbar>
          <OkrProvider>
            <TeamProvider>
              <Routes>
                <Route element={<PrivateGuard />}>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/okrsPage" element={<OkrsPage />}></Route>
                  <Route path="/okrs/:okrId" element={<OkrDetails />}></Route>
                  <Route path="/teams" element={<Teams />}></Route>
                  <Route
                    path="/teams/:teamId"
                    element={<TeamDetails />}
                  ></Route>
                  <Route path="/employees" element={<Employees />}></Route>
                  <Route
                    path="/employees/:employeeId"
                    element={<EmployeeDetails />}
                  ></Route>
                  <Route path="/logout" element={<Logout />} />
                </Route>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/404" element={<PageNotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TeamProvider>
          </OkrProvider>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
