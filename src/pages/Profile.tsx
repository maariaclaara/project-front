import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export default function UserProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/users/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(res.data);
      setName(res.data.name);
    } catch (err) {
      setError('Erro ao carregar dados do perfil');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/users/me', { name, password }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPassword('');
      setSuccess('Perfil atualizado com sucesso!');
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar perfil');
      setSuccess('');
    }
  };

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-xl font-bold">Meu Perfil</h1>

          {success && <p className="text-green-600 text-sm">{success}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Data de criação</label>
            <p className="text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-3 pt-4">
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Nova senha (opcional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">Atualizar Perfil</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}