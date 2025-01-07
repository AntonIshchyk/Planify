import { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import MenuBar from './components/Home/MenuBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Startup from './components/Home/Startup';
import CreateEvent from './components/Events/CreateEvent';
import axios from 'axios';
import AdminScreen from './components/Home/AdminScreen';
import UserScreen from './components/Home/UserScreen';
import EventList from './components/Events/EventList';
import { AppState, initAppState } from './App.state';
import CreateAttendance from './components/EventAttendance/CreateAttendance';
import EventAttendanceesList from './components/EventAttendance/EventAttendanceesList';
import ViewAttendancees from './components/EventAttendance/ViewAttendancees';
import Register from './components/Register/Register';
import AddAdminAccount from './components/Register/AddAdminAccount';
import { Friends } from './components/Friends/Friends';
import EventDetails from './components/Events/EventDetails';
import apiClient from './ApiClient';
import UpdateEvent from './components/Events/UpdateEvent';

export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = initAppState;
  }

  handleBacktoMenuClick = () => {
    this.setState(this.state.updateField("showAdminLogin", false));
    this.setState(this.state.updateField("showUserLogin", false));
    this.setState(this.state.updateField("showRegister", false));
  };

  handleRegisterClick = () => {
    this.setState(this.state.updateField("showAdminLogin", false));
    this.setState(this.state.updateField("showUserLogin", false));
    this.setState(this.state.updateField("showRegister", true));
  };

  handleUserClick = () => {
    this.setState(this.state.updateField("showAdminLogin", false));
    this.setState(this.state.updateField("showUserLogin", true));
    this.setState(this.state.updateField("showRegister", false));
  };

  handleAdminClick = () => {
    this.setState(this.state.updateField("showAdminLogin", true));
    this.setState(this.state.updateField("showUserLogin", false));
    this.setState(this.state.updateField("showRegister", false));
  };
  /*handleBacktoMenuClick = () => {
    this.setState(this.state.updateShowAdminLogin(false));
    this.setState(this.state.updateShowUserLogin(false));
    this.setState(this.state.updateShowRegister(false));
  };

  handleUserClick = () => {
    this.setState(this.state.updateShowAdminLogin(false));
    this.setState(this.state.updateShowUserLogin(true));
    this.setState(this.state.updateShowRegister(false));
  };

  handleAdminClick = () => {
    this.setState(this.state.updateShowAdminLogin(true));
    this.setState(this.state.updateShowUserLogin(false));
    this.setState(this.state.updateShowRegister(false));
  };
  handleRegisterClick = () => {
    this.setState(this.state.updateShowAdminLogin(false));
    this.setState(this.state.updateShowUserLogin(false));
    this.setState(this.state.updateShowRegister(true));
  };*/

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
      const response = await apiClient.get('http://localhost:3000/Calender-Website/check-admin', {
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
      const response = await apiClient.get('http://localhost:3000/Calender-Website/check-logged-in', {
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
          <MenuBar
          
            isAdmin={this.state.isAdmin}
            isLoggedIn={this.state.loggedIn}
          />
          
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {!this.state.loggedIn && !this.state.showRegister && (this.state.showUserLogin || this.state.showAdminLogin) && (
                    <Login
                      onBacktoMenuClick={this.handleBacktoMenuClick}
                      isAdminLogin={this.state.showAdminLogin}
                      isUserLogin={this.state.showUserLogin}
                      onRegisterClick={this.handleRegisterClick}
                    />
                  )}
                  {!this.state.loggedIn && !this.state.showAdminLogin && !this.state.showUserLogin && !this.state.showRegister && (
                    <Startup onUserClick={this.handleUserClick} onAdminClick={this.handleAdminClick} />
                  )}
                  {this.state.isAdmin && <AdminScreen />}
                  {!this.state.isAdmin && this.state.loggedIn && <UserScreen />}
                  {!this.state.showUserLogin && !this.state.showAdminLogin && this.state.showRegister && <Register onBacktoMenuClick={this.handleBacktoMenuClick} />}
                </>
              }/>
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/get-all-events" element={<EventList
              onBacktoMenuClick={this.handleBacktoMenuClick}
              isAdminLogin={this.state.isAdmin}
              isLoggedIn={this.state.loggedIn} />} />
            <Route path="/update-event/:Id" element={<UpdateEvent/>} />
            <Route path="/get-all-events" element={<EventList onBacktoMenuClick={function (): void {
              throw new Error('Function not implemented.');
            } } isAdminLogin={this.state.isAdmin} isLoggedIn={this.state.loggedIn} />} />
            <Route path="/attend" element={<CreateAttendance/>}/>
            <Route path="/attending-events" element={<EventAttendanceesList />} />
            <Route path="/show-attendances/:eventId/:title" element={<ViewAttendancees/>} />
            <Route path="/add-admin" element={<AddAdminAccount/>} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/show-event/:eventId" element={<EventDetails onBacktoMenuClick={this.handleBacktoMenuClick} isAdminLogin={this.state.isAdmin} isLoggedIn={this.state.loggedIn}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
/*<ToastContainer
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
          />*/