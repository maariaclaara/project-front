import React, { useState } from 'react';
import '../styles/LoginRegister.css';
import ImageUploader from '../components/Image';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormRegister: React.FC = () => {

 const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar usuário');
    }
  };

  return (
    <form onSubmit={handleRegister}>

      <label htmlFor="name" className="Buttonnn">Nome Completo</label>
      <input
        className="Input"
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="email" className="Buttonn">Email</label>
      <input
        className="Input"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password" className="Buttonn">Senha</label>
      <input
        className="Input"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <ImageUploader />

      <button type="submit" className="Button"> 
        Cadastrar 
      </button>
    </form>
  );
};

export default FormRegister;