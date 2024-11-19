import { useState } from 'react';
import './App.css';
import Login from './components/Login';

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
      {}
      {(showUserLogin || showAdminLogin) && <Login onBacktoMenuClick={handleBacktoMenuClick} isAdmin={showAdminLogin} isUser={showUserLogin}/>}
      {!showAdminLogin && !showUserLogin && <Startup onUserClick={handleUserClick} onAdminClick={handleAdminClick}/>}

    </div>
  );
}

export default App;