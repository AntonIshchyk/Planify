import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';

function App() {

  const [showAdminLogin, setAdminLogin] = useState(false);
  return (
    <div className="App">
      
      {/* Add the Login component here */}
      <Login />
    </div>
  );
}

export default App;