import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { AuthContext } from './contexts/AuthContext';
import { OkrContext } from './contexts/OkrContext';

import { useLocalStorage } from './hooks/useLocalStorage';

import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { CreateGame } from './components/CreateOkr';
import Logout from './components/Logout';

function App() {

  const [okrs, setOkrs] = useState([]);
  const [auth, setAuth] = useLocalStorage('auth', {});
  const navigate = useNavigate();

  const userLogin = (authData) => {
    setAuth(authData);
  };

  const userLogout = () => {
    setAuth({});
  };

  const okrAdd = (okrData) => {
    setOkrs(state => [
      ...state,
      okrData,
    ]);

    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
      <div className="App">
        <Navbar></Navbar>
        <OkrContext.Provider value={{okrs, okrAdd}}>
        <Routes>
            <Route path="/create" element={<CreateGame/>}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </OkrContext.Provider>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
