import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllManutencoes, deleteManutencao } from '../services/manutencaoService';
import ManutencaoForm from './ManutencaoForm';

const ManutencaoList = () => {
  const [manutencoes, setManutencoes] = useState([]);
  const [editingManutencao, setEditingManutencao] = useState(null);
  const [filtro, setFiltro] = useState("todos");
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

  const manutencoesFiltradas = manutencoes.filter((m) => {
    if (filtro === "concluidos") return m.foiConcluida;
    if (filtro === "pendentes") return !m.foiConcluida;
    return true;
  });

  const totalFiltrado = manutencoesFiltradas.reduce((soma, m) => soma + (parseFloat(m.custo) || 0), 0);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">📋 Manutenções Registradas</h2>
        <button className="btn btn-success btn-lg shadow-sm" onClick={() => setEditingManutencao({})}>
          <i className="bi bi-plus-circle me-2"></i>Nova Manutenção
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-3 d-flex gap-3">
        {["todos", "concluidos", "pendentes"].map((item) => (
          <button
            key={item}
            className={`btn ${filtro === item
              ? item === "concluidos" ? "btn-success"
              : item === "pendentes" ? "btn-danger"
              : "btn-primary"
              : `btn-outline-${item === "concluidos" ? "success" : item === "pendentes" ? "danger" : "primary"}`}`}
            onClick={() => setFiltro(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {filtro !== "todos" && (
        <div className="mb-3">
          <strong>
            Total em serviços {filtro === "concluidos" ? "concluídos" : "pendentes"}:{" "}
          </strong>
          R$ {totalFiltrado.toFixed(2)}
        </div>
      )}

      <div className="table-responsive shadow rounded">
        <table className="table table-hover align-middle table-bordered border-light">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Equipamento</th>
              <th>Tipo</th>
              <th>Cliente</th>
              <th>Custo</th>
              <th>Data</th>
              <th>Status</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {manutencoesFiltradas.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.equipamento}</td>
                <td>{m.tipoManutencao}</td>
                <td>{m.cliente}</td>
                <td>R$ {parseFloat(m.custo).toFixed(2)}</td>
                <td>{m.dataManutencao}</td>
                <td>
                  <span className={`badge rounded-pill ${m.foiConcluida ? 'bg-success' : 'bg-danger'}`}>
                    <i className={`bi ${m.foiConcluida ? 'bi-check-circle' : 'bi-clock'} me-1`}></i>
                    {m.foiConcluida ? 'Concluída' : 'Pendente'}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-warning btn-sm me-2"
                    onClick={() => handleEdit(m)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(m.id)}
                  >
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
