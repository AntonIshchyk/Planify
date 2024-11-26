import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MenuBar from './components/MenuBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Startup from './components/Startup';
import CreateEvent from './components/CreateEvent'; // Import the new component
import axios from 'axios';
import AdminScreen from './components/AdminScreen';
import UserScreen from './components/UserScreen';
import EventList from './components/EventList';
import { AppState, initAppState } from './App.state';

export class App extends React.Component<{}, AppState> {

  constructor(props : {}){
    super(props );
    this.state = initAppState;
  }
   handleBacktoMenuClick = () => {
    this.setState(this.state.updateShowAdminLogin(false));
    this.setState(this.state.updateShowUserLogin(false));
  };
   handleUserClick = () => {
    this.setState(this.state.updateShowAdminLogin(false));
    this.setState(this.state.updateShowUserLogin(true));
  };
   handleAdminClick = () => {
    this.setState(this.state.updateShowAdminLogin(true)); 
    this.setState(this.state.updateShowUserLogin(false));
  };
  async componentDidMount() {
    // Check and show toast message first
    const message = localStorage.getItem('message');
    if (message) {
        toast.info(message); // Display the message
        localStorage.removeItem('message'); // Clear it
    }

    // Run async checks without delaying the toast rendering
    this.checkAdminStatus();
    this.checkLoginStatus();
}

checkAdminStatus = async () => {
    try {
        const response = await axios.get('http://localhost:3000/Calender-Website/check-admin', {
            withCredentials: true,
        });
        this.setState({ isAdmin: response.data }); // true or false
    } catch (error) {
        console.error('Error checking admin status:', error);
        this.setState({ isAdmin: false }); // Default to false if there's an error
    }
};

checkLoginStatus = async () => {
    try {
        const response = await axios.get('http://localhost:3000/Calender-Website/check-logged-in', {
            withCredentials: true,
        });
        this.setState({
            loggedIn: response.data,
            showAdminLogin: false,
            showUserLogin: false,
        });
    } catch (error) {
        console.error('Error checking login status:', error);
        this.setState({ loggedIn: false });
    }
};
render(){
  return (
    <BrowserRouter>
      <div className="App">
      <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false} 
          newestOnTop 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          theme="light"
        />  

        <MenuBar isAdmin={this.state.isAdmin} 
        isLoggedIn={this.state.loggedIn}
        /> 
        <Routes>
          <Route
            path="/"
            element={
              <>
                {!this.state.loggedIn && (this.state.showUserLogin || this.state.showAdminLogin) && (
                  <Login
                    onBacktoMenuClick={this.handleBacktoMenuClick}
                    isAdminLogin={this.state.showAdminLogin}
                    isUserLogin={this.state.showUserLogin}
                  />
                )}
                {!this.state.loggedIn && !this.state.showAdminLogin && !this.state.showUserLogin && (
                  <Startup
                    onUserClick={this.handleUserClick}
                    onAdminClick={this.handleAdminClick}
                  />
                )}
                {this.state.isAdmin && (
                  <AdminScreen/>
                )}
                {!this.state.isAdmin && this.state.loggedIn && (
                  <UserScreen/>
                )

                }
              </>
            }
          />
          <Route path="/create-event" element={<CreateEvent/>}/>
          <Route path="/get-all-events" element={<> <EventList/> </>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
}

export default App;