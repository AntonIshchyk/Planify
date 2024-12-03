"use client";
import { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MenuBar from './components/MenuBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Startup from './components/Startup';
import CreateEvent from './components/CreateEvent';
import axios from 'axios';
import AdminScreen from './components/AdminScreen';
import UserScreen from './components/UserScreen';
import EventList from './components/EventList';
import DeleteEvent from './components/DeleteEvent';
import { AppState, initAppState } from './App.state';
import CreateAttendance from './components/CreateAttendance';

export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
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

  componentDidMount() {
    // Check and show toast message first
    this.checkLocalStorageMessage(); // Check message from localStorage

    // Run async checks without delaying the toast rendering
    this.checkAdminStatus();
    this.checkLoginStatus();

    // Handle the beforeunload event to persist the message
    window.onbeforeunload = () => {
      const message = localStorage.getItem('message');
      if (message) {
        // Ensure the message is set before the page unloads
        localStorage.setItem('message', message);
      }
    };
  }

  // Check localStorage for any stored message
  checkLocalStorageMessage = () => {
    const message = localStorage.getItem('message');
    if (message) {
      toast.info(message); // Display the message
      setTimeout(() => {
        localStorage.removeItem('message'); // Clear it after showing the message
      }, 100); // Delay clearing to let toast render
    }
  };

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

  render() {
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

          <MenuBar
            isAdmin={this.state.isAdmin}
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
                    <Startup onUserClick={this.handleUserClick} onAdminClick={this.handleAdminClick} />
                  )}
                  {this.state.isAdmin && <AdminScreen />}
                  {!this.state.isAdmin && this.state.loggedIn && <UserScreen />}
                </>
              }
            />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/get-all-events" element={<EventList />} />
            <Route path="/delete-event" element={<DeleteEvent />} />
            <Route path="/attend" element={<CreateAttendance/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
