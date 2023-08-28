import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { OkrProvider } from "./contexts/OkrContext";
import { TeamProvider } from "./contexts/TeamContext";
import { PrivateGuard } from "./components/common/PrivateGuard";

import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { EditOkr } from "./components/EditOkr";
import { Home } from "./components/Home";
import { OkrDetails } from "./components/OkrDetails";
import { Teams } from "./components/Teams";
import { Employees } from "./components/Employees";
import { CreateTeam } from "./components/CreateTeam";
import { TeamDetails } from "./components/TeamDetails";
import { EmployeeDetails } from "./components/EmployeeDetails";
import { EditTeam } from "./components/EditTeam";
import { LandingPage } from "./components/LandingPage";
import Logout from "./components/Logout";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar></Navbar>
        <OkrProvider>
          <TeamProvider>
            <Routes>
              <Route element={<PrivateGuard />}>
                {/* <Route path="/create" element={<CreateOkr />}></Route> */}
                <Route path="/okrs/:okrId" element={<OkrDetails />}></Route>
                <Route path="/okrs/:okrId/edit" element={<EditOkr />}></Route>
                <Route path="/teams" element={<Teams />}></Route>
                <Route path="/teams/create" element={<CreateTeam />}></Route>
                <Route path="/teams/:teamId" element={<TeamDetails />}></Route>
                <Route
                  path="/teams/:teamId/edit"
                  element={<EditTeam />}
                ></Route>
                <Route path="/employees" element={<Employees />}></Route>
                <Route
                  path="/employees/:employeeId"
                  element={<EmployeeDetails />}
                ></Route>
                <Route path="/logout" element={<Logout />} />
              </Route>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </TeamProvider>
        </OkrProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
