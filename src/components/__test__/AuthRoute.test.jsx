import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import AuthRoute from '../AuthRoute'; // Ajusta esta ruta según sea necesario
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/auth'; // Ajusta la ruta según tu proyecto

// Función para crear un store simulado
const mockStore = (state) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: state,
  });
};

describe('AuthRoute', () => {
  it('renders the children if user is not logged in', () => {
    const store = mockStore({
      auth: {
        userLoggedIn: false,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthRoute>
            <div>Public Content</div>
          </AuthRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Public Content')).toBeInTheDocument();
  });

  it('navigates to the dashboard if user is logged in', () => {
    // Mock parcial de 'react-router-dom'
    vi.mock('react-router-dom', async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        Navigate: ({ to }) => {
          return <div>Mocked Navigate to {to}</div>; // Simula el componente Navigate
        },
      };
    });

    const store = mockStore({
      auth: {
        userLoggedIn: true,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthRoute>
            <div>Public Content</div>
          </AuthRoute>
        </BrowserRouter>
      </Provider>
    );

    // Verifica que haya redirigido al dashboard
    expect(getByText('Mocked Navigate to /dashboard')).toBeInTheDocument();
  });
});