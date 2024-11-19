import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MenuBar from './components/MenuBar';

import Startup from './components/Startup';
import CreateEvent from './components/CreateEvent'; // Import the new component
import axios from 'axios';
import AdminScreen from './components/AdminScreen';
import UserScreen from './components/UserScreen';
import EventList from './components/EventList';
function App() {
  const [showAdminLogin, setAdminLogin] = useState(false);
  const [showUserLogin, setUserLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleAdminClick = () => setAdminLogin(true);
  const handleUserClick = () => setUserLogin(true);
  const handleLoginClick = () => setLoggedIn(true);
  const handleBacktoMenuClick = () => {
    setAdminLogin(false);
    setUserLogin(false);
  };

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Calender-Website/check-admin', {withCredentials : true});
        setIsAdmin(response.data); // true or false
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);  // Default to false if there's an error
      }
    }
    const checkLoginStatus = async () => {
      try{
        const response = await axios.get('http://localhost:3000/Calender-Website/check-logged-in', {withCredentials : true});
        setLoggedIn(response.data);
        setAdminLogin(false);
        setUserLogin(false);
      }
      catch(error) {
        console.error('Error checking login status: ', error);
        setLoggedIn(false);
      }
    };

    checkAdminStatus();
    checkLoginStatus();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <MenuBar isAdmin={isAdmin} 
        isLoggedIn={loggedIn}
        /> 
        <Routes>
          <Route
            path="/"
            element={
              <>
                {!loggedIn && (showUserLogin || showAdminLogin) && (
                  <Login
                    onBacktoMenuClick={handleBacktoMenuClick}
                    isAdminLogin={showAdminLogin}
                    isUserLogin={showUserLogin}
                  />
                )}
                {!loggedIn && !showAdminLogin && !showUserLogin && (
                  <Startup
                    onUserClick={handleUserClick}
                    onAdminClick={handleAdminClick}
                  />
                )}
                {isAdmin && (
                  <AdminScreen/>
                )}
                {!isAdmin && loggedIn && (
                  <UserScreen/>
                )

                }
              </>
            }
          />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/get-all-events" element={<EventList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;