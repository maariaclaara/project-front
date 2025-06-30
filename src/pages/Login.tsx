import React from 'react';
import logo from '../assets/logo.png';
import FormLogin from '../components/FormLogin';
import '../styles/LoginRegister.css';

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <div className="App-login">

        <h1 className="H1-style">JUNTOS SOMOS MAIS FORTES, DIVERSIFICADOS SOMOS IMBATÍVEIS!</h1>

        <div>
          <FormLogin />
          
          <p>Ainda não tem uma conta?</p>
          <a href="/register" className='App-link'>Cadastre-se</a>

          </div>
        </div>
      </header>
    </div>
  );
}

export default Login;
