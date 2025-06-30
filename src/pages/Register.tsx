import React from 'react';
import logo from '../assets/logo.png';
import '../styles/LoginRegister.css';
import FormRegister from '../components/FormRegister';

function Register() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <div className="App-login">

        <h1 className="H1-style">JUNTOS SOMOS MAIS FORTES, DIVERSIFICADOS SOMOS IMBATÍVEIS!</h1>

        <div>
          <FormRegister /> 
        
          </div>
        </div>
      </header>
    </div>
  );
}

export default Register;
