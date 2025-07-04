import React, { useState, useEffect } from 'react';
import { createManutencao, updateManutencao } from '../services/manutencaoService';

const ManutencaoForm = ({ manutencao, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    equipamento: '',
    tipoManutencao: '',
    cliente: '',
    custo: '',
    dataManutencao: '',
    foiConcluida: false,
    cep: '',
    endereco: '',
  });

  useEffect(() => {
    if (manutencao) {
      setFormData({
        id: manutencao.id || '',
        equipamento: manutencao.equipamento || '',
        tipoManutencao: manutencao.tipoManutencao || '',
        cliente: manutencao.cliente || '',
        custo: manutencao.custo || '',
        dataManutencao: manutencao.dataManutencao || '',
        foiConcluida: manutencao.foiConcluida || false,
        cep: manutencao.cep || '',
        endereco: manutencao.endereco || '',
      });
    }
  }, [manutencao]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');

    setFormData((prev) => ({ ...prev, cep }));

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
          }));
        } else {
          setFormData((prev) => ({ ...prev, endereco: 'CEP não encontrado' }));
        }
      } catch (error) {
        setFormData((prev) => ({ ...prev, endereco: 'Erro ao buscar endereço' }));
      }
    } else {
      setFormData((prev) => ({ ...prev, endereco: '' }));
    }
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
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">
              {manutencao?.id ? 'Editar Manutenção' : 'Nova Manutenção'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
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
                <label className="form-label">Cliente:</label>
                <input
                  type="text"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">CEP:</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleCepChange}
                  className="form-control"
                  placeholder="Ex: 74600000"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Endereço:</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className="form-control"
                  readOnly
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

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="foiConcluida"
                  checked={formData.foiConcluida}
                  onChange={handleChange}
                  id="foiConcluida"
                />
                <label className="form-check-label" htmlFor="foiConcluida">
                  Manutenção Concluída
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                {manutencao?.id ? 'Atualizar' : 'Salvar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
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
