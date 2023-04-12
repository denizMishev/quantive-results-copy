import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

import { useLocalStorage } from './hooks/useLocalStorage';

import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {

  const [auth, setAuth] = useLocalStorage('auth', {});

  const userLogin = (authData) => {
    setAuth(authData);
  };

  const userLogout = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
