import React, { useState, useEffect } from 'react';
import { createManutencao, updateManutencao } from '../services/manutencaoService';

const ManutencaoForm = ({ manutencao, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    equipamento: '',
    tipoManutencao: '',
    custo: '',
    dataManutencao: '',
    foiConcluida: false,
  });

  useEffect(() => {
    if (manutencao) {
      setFormData({
        id: manutencao.id || '',
        equipamento: manutencao.equipamento || '',
        tipoManutencao: manutencao.tipoManutencao || '',
        custo: manutencao.custo || '',
        dataManutencao: manutencao.dataManutencao || '',
        foiConcluida: manutencao.foiConcluida || false,
      });
    }
  }, [manutencao]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (manutencao?.id) {
      await updateManutencao(manutencao.id, formData);
    } else {
      await createManutencao(formData);
    }
    onSubmit();
  };

  return (
    <div className="card shadow mt-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">{manutencao?.id ? 'Editar Manutenção' : 'Nova Manutenção'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {manutencao?.id && (
            <div className="mb-3">
              <label className="form-label">ID:</label>
              <input type="text" name="id" value={formData.id} readOnly className="form-control" />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Equipamento:</label>
            <input
              type="text"
              name="equipamento"
              value={formData.equipamento}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo de Manutenção:</label>
            <input
              type="text"
              name="tipoManutencao"
              value={formData.tipoManutencao}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Custo (R$):</label>
            <input
              type="number"
              name="custo"
              value={formData.custo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Data da Manutenção:</label>
            <input
              type="date"
              name="dataManutencao"
              value={formData.dataManutencao}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="foiConcluida"
              checked={formData.foiConcluida}
              onChange={handleChange}
              id="concluidaCheck"
            />
            <label className="form-check-label" htmlFor="concluidaCheck">
              Manutenção Concluída
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success me-2">
              {manutencao?.id ? 'Atualizar' : 'Salvar'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManutencaoForm;
