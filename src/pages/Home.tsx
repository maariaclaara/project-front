import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [search, role, orderBy, order, page]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users', {
        params: { search, role, orderBy, order, page },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error('Erro ao carregar usuários', err);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/users/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchUsers();
    } catch (err) {
      console.error('Erro ao excluir usuário', err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Buscar por nome ou email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select onValueChange={setRole} value={role}>
          <SelectTrigger className="w-[120px]">{role || 'Todos'}</SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="USER">USER</SelectItem>
            <SelectItem value="ADMIN">ADMIN</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setOrderBy} value={orderBy}>
          <SelectTrigger className="w-[140px]">Ordenar por</SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="createdAt">Data de Criação</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(v) => setOrder(v as 'asc' | 'desc')} value={order}>
          <SelectTrigger className="w-[100px]">{order === 'asc' ? 'ASC' : 'DESC'}</SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">ASC</SelectItem>
            <SelectItem value="desc">DESC</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Anterior</Button>
        <span>Página {page}</span>
        <Button onClick={() => setPage((prev) => prev + 1)}>Próxima</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4 space-y-2">
              <div className="font-bold text-lg">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
              <div className="text-sm">Função: {user.role}</div>
              <div className="text-sm">Status: {user.isActive ? 'Ativo' : 'Inativo'}</div>
              <div className="text-xs text-muted-foreground">
                Criado em: {new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={() => handleEdit(user.id)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>Excluir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
