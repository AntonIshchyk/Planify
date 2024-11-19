import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';

import Startup from './components/Startup';
function App() {

  const [showAdminLogin, setAdminLogin] = useState(false);
  const [showUserLogin, setUserLogin] = useState(false);
  const handleAdminClick = () => setAdminLogin(true);
  const handleUserClick = () => setUserLogin(true);
  const handleBacktoMenuClick = () => {
    setAdminLogin(false)
    setUserLogin(false)
  };
  return (
    <div className="App">
      <EventList />
      {}
      {(showUserLogin || showAdminLogin) && <Login onBacktoMenuClick={handleBacktoMenuClick} isAdmin={showAdminLogin} isUser={showUserLogin}/>}
      {!showAdminLogin && !showUserLogin && <Startup onUserClick={handleUserClick} onAdminClick={handleAdminClick}/>}

    </div>
  );
}

export default App;