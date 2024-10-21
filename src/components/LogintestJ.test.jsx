import { render, screen, fireEvent } from '@testing-library/react';
import Login from '@/components/Login'; // Asegúrate de que la ruta sea correcta
import { vi } from 'vitest';
import UserAuth from '@/hooks/UserAuth';

// Mock del hook UserAuth
vi.mock('@/hooks/UserAuth', () => ({
  default: vi.fn(),
}));

describe('Login Component - Button Functionality', () => {
  let mockHandleLoginWithEmail;
  let mockHandleLoginWithGoogle;

  beforeEach(() => {
    // Crear mocks de las funciones de login
    mockHandleLoginWithEmail = vi.fn();
    mockHandleLoginWithGoogle = vi.fn();

    // Mockear el hook UserAuth
    UserAuth.mockReturnValue({
      email: 'test@example.com',
      password: 'password123',
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
      handleLoginWithEmail: mockHandleLoginWithEmail,
      handleLoginWithGoogle: mockHandleLoginWithGoogle,
    });
  });


  it('should call handleLoginWithGoogle when the login with Google button is clicked', () => {
    // Renderizar el componente Login
    render(<Login />);

    // Obtener el botón de login con Google
    const googleButton = screen.getByText(/Login with Google/i);

    // Simular un clic en el botón de login con Google
    fireEvent.click(googleButton);

    // Asegurarse de que handleLoginWithGoogle fue llamado
    expect(mockHandleLoginWithGoogle).toHaveBeenCalledTimes(1);
  });
});