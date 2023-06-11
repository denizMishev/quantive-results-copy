import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { OkrProvider } from './contexts/OkrContext';

import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { CreateOkr } from './components/CreateOkr';
import { EditOkr } from './components/EditOkr';
import { Home } from './components/Home';
import { OkrDetails } from './components/OkrDetails';
import Logout from './components/Logout';

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Navbar></Navbar>
        <OkrProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<CreateOkr />}></Route>
            <Route path="/okrs/:okrId" element={<OkrDetails />}></Route>
            <Route path="/okrs/:okrId/edit" element={<EditOkr />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </OkrProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
