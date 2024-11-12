import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Startup from './components/Startup';
function App() {

  const [showAdminLogin, setAdminLogin] = useState(false);
  const [showUserLogin, setUserLogin] = useState(false);
  const handleAdminClick = () => setAdminLogin(true);
  const handleUserClick = () => setUserLogin(true);
  return (
    <div className="App">
      
      {}
      {showUserLogin && <Login />}
      {showAdminLogin && <AdminLogin />}
      {!showAdminLogin && !showUserLogin && <Startup onUserClick={handleUserClick} onAdminClick={handleAdminClick}/>}
      

    </div>
  );
}

export default App;