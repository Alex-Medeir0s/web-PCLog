import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllManutencoes, deleteManutencao } from '../services/manutencaoService';
import ManutencaoForm from './ManutencaoForm';

const ManutencaoList = () => {
  const [manutencoes, setManutencoes] = useState([]);
  const [editingManutencao, setEditingManutencao] = useState(null);
  const location = useLocation();

  useEffect(() => {
    loadManutencoes();
    if (location.state?.abrirFormulario) {
      setEditingManutencao({});
    }
  }, []);

  const loadManutencoes = async () => {
    const data = await getAllManutencoes();
    setManutencoes(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir esta manutenção?')) {
      await deleteManutencao(id);
      loadManutencoes();
    }
  };

  const handleEdit = (manutencao) => {
    setEditingManutencao(manutencao);
  };

  const handleFormSubmit = () => {
    setEditingManutencao(null);
    loadManutencoes();
  };

  const handleCloseForm = () => {
    setEditingManutencao(null);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">📋 Manutenções Registradas</h2>
        <button className="btn btn-success btn-lg" onClick={() => setEditingManutencao({})}>
          + Nova Manutenção
        </button>
      </div>

      <div className="table-responsive shadow rounded">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Equipamento</th>
              <th>Tipo</th>
              <th>Custo</th>
              <th>Data</th>
              <th>Status</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {manutencoes.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.equipamento}</td>
                <td>{m.tipoManutencao}</td>
                <td>R$ {parseFloat(m.custo).toFixed(2)}</td>
                <td>{m.dataManutencao}</td>
                <td>
                  <span className={`badge ${m.foiConcluida ? 'bg-success' : 'bg-danger'}`}>
                    {m.foiConcluida ? 'Concluída' : 'Pendente'}
                  </span>
                </td>
                <td className="text-center">
                  <button className="btn btn-outline-warning btn-sm me-2" onClick={() => handleEdit(m)}>
                    ✏️ Editar
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(m.id)}>
                    🗑️ Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingManutencao && (
        <ManutencaoForm
          manutencao={editingManutencao}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default ManutencaoList;
