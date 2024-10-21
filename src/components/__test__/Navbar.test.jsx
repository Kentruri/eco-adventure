import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Navbar from '@/components/Navbar'; // Asegúrate de que la ruta sea correcta
import { signOut } from '@/redux/slices/auth';
import { vi } from 'vitest'; // Importa vitest para mockear

// Configurar un mock del store de Redux
const mockStore = configureStore([]);

describe('Navbar', () => {
  let store;

  beforeEach(() => {
    // Estado inicial para el test
    store = mockStore({
      auth: {
        userLoggedIn: false, // Cambiar esto según el caso que se desee probar
      },
    });
  });

  test('renders login and sign up links when user is not logged in', () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Verificar que los enlaces de Login y Sign Up estén presentes
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('renders logout button when user is logged in', () => {
    // Cambiar el estado para simular que el usuario está logueado
    store = mockStore({
      auth: {
        userLoggedIn: true,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Verificar que el botón de Logout esté presente
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  
      
    });

   
    // Mockear el despachador (dispatch) usando vitest
    const dispatch = vi.fn();

  
