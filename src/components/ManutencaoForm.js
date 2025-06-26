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
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%', borderRadius: '16px' }}>
        <div className="card-body">
          <h4 className="text-center mb-4 text-primary">
            {manutencao?.id ? 'Editar Manutenção' : 'Nova Manutenção'}
          </h4>
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
            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary w-50 me-2">
                {manutencao?.id ? 'Atualizar' : 'Salvar'}
              </button>
              <button type="button" className="btn btn-outline-secondary w-50" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManutencaoForm;
