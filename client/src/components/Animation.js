import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import LoginPhoto from "../images/loginphoto.jpg";

function App() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-transform duration-500 ${
          isRegister ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <img
          src={LoginPhoto}
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Container */}
      <div
        className={`absolute inset-0 w-full transition-transform duration-500 ${
          isRegister ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {isRegister ? (
          <Register onLogin={() => setIsRegister(false)} />
        ) : (
          <Login onRegister={() => setIsRegister(true)} />
        )}
      </div>
    </div>
  );
}

export default App;
