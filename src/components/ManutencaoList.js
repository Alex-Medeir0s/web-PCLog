import React, { useState, useEffect } from 'react';
import { getAllManutencoes, deleteManutencao } from '../services/manutencaoService';
import ManutencaoForm from './ManutencaoForm';

const ManutencaoList = () => {
  const [manutencoes, setManutencoes] = useState([]);
  const [editingManutencao, setEditingManutencao] = useState(null);

  useEffect(() => {
    loadManutencoes();
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📋 Controle de Manutenções</h3>
        <button className="btn btn-primary" onClick={() => setEditingManutencao({})}>
          + Nova Manutenção
        </button>
      </div>

      <table className="table table-hover table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Equipamento</th>
            <th>Tipo</th>
            <th>Custo</th>
            <th>Data</th>
            <th>Concluída</th>
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
              <td>{m.foiConcluida ? '✅' : '❌'}</td>
              <td className="text-center">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(m)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(m.id)}
                >
                  🗑️ Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
