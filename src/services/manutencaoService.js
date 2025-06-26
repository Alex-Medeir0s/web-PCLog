import axios from 'axios';

const API_URL = 'http://localhost:8080/manutencao';

export const getAllManutencoes = async () => {
  const response = await axios.get(`${API_URL}/listar`);
  return response.data;
};

export const getManutencaoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createManutencao = async (manutencao) => {
  const response = await axios.post(`${API_URL}/adicionar`, manutencao);
  return response.data;
};

export const updateManutencao = async (id, manutencao) => {
  const response = await axios.put(`${API_URL}/atualizar/${id}`, manutencao);
  return response.data;
};

export const deleteManutencao = async (id) => {
  await axios.delete(`${API_URL}/remover/${id}`);
};
