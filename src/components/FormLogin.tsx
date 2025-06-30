import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginRegister.css';

const FormLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');

  const handleInputChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { token, role } = res.data;
      localStorage.setItem('token', token);

      if (role === 'ADMIN') {
        navigate('/admin/users');
      } else {
        navigate('/profile');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };


  return (
    <form onSubmit={handleInputChange}>
      <label className="Buttonn">Email</label>
      <input
        className="Input"
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

       <label className="Buttonn">Senha</label>
      <input
        className="Input"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" id="redirect" className="Button"> 
        Entrar 
      </button>
    </form>
  );
};

export default FormLogin;