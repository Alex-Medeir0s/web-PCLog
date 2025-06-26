import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-pclog.png';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      {/* Coluna Esquerda com a logo */}
      <div style={styles.leftSide}>
        <img src={logo} alt="Logo PCLog" style={styles.logoLeft} />
      </div>

      {/* Coluna Direita */}
      <div style={styles.rightSide}>
        <div style={styles.card}>
          <h3 style={styles.title}>Bem-vindo ao PCLog</h3>
          <p style={styles.subtitle}>Gerencie suas manutenções com facilidade</p>

          <button
            style={styles.primaryButton}
            onClick={() => navigate('/manutencoes', { state: { abrirFormulario: true } })}
          >
            Adicionar Manutenção
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => navigate('/manutencoes')}
          >
            Ver Manutenções
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f0f4f8',
  },
  leftSide: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  rightSide: {
    flex: 1,
    backgroundColor: '#00AEEF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLeft: {
    width: '100%',
    maxWidth: '650px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '380px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#777',
    marginBottom: '25px',
  },
  primaryButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  secondaryButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#fff',
    color: '#007bff',
    border: '2px solid #007bff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default WelcomeScreen;
