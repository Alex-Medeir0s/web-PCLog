import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-pclog.png'; // ajuste o caminho conforme necessário

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '2rem',
      backgroundColor: '#fff',
      textAlign: 'center',
    },
    logo: {
      width: '300px',
      height: 'auto',
      marginBottom: '30px',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#007bff',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#666',
      marginBottom: '30px',
    },
    buttonPrimary: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 30px',
      fontSize: '1rem',
      borderRadius: '25px',
      marginBottom: '15px',
      cursor: 'pointer',
    },
    linkButton: {
      background: 'none',
      border: 'none',
      color: '#007bff',
      fontSize: '1rem',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo PCLog" style={styles.logo} />
      <h1 style={styles.title}>Bem-vindo ao PCLog</h1>
      <p style={styles.subtitle}>
        Cadastre serviços de TI e acompanhe as manutenções
      </p>

      <button style={styles.buttonPrimary} onClick={() => navigate('/manutencoes')}>
        Adicionar
      </button>

      <button style={styles.linkButton} onClick={() => navigate('/manutencoes')}>
        Ver Manutenções
      </button>
    </div>
  );
};

export default WelcomeScreen;
