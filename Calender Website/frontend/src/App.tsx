import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';

function App() {

  const [showAdminLogin, setAdminLogin] = useState(false);
  return (
    <div className="App">
      
      {}
      <Login />
      <AdminLogin />
    </div>
  );
}

export default App;