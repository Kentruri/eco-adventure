import { render, screen } from '@testing-library/react';
import Login from '@/components/Login'; // Asegúrate de que la ruta sea correcta
import { vi } from 'vitest';
import UserAuth from '@/hooks/UserAuth';

// Mock del hook UserAuth
vi.mock('@/hooks/UserAuth', () => ({
  default: vi.fn(),
}));

describe('Login Component - Form Rendering', () => {
  beforeEach(() => {
    // Mockear el hook con valores iniciales para el test
    UserAuth.mockReturnValue({
      email: '',
      password: '',
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
      handleLoginWithEmail: vi.fn(),
      handleLoginWithGoogle: vi.fn(),
    });
  });

  it('should render the login form with email, password inputs and buttons', () => {
    // Renderizar el componente Login
    render(<Login />);

    // Verificar que el input de email se renderiza
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();

    // Verificar que el input de password se renderiza
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    // Verificar que el título "Login" se renderiza
    const loginTitle = screen.getByRole('heading', { name: /Login/i });
    expect(loginTitle).toBeInTheDocument();

    // Verificar que el botón de login con email se renderiza
    const [loginButton] = screen.getAllByText(/Login/i);
    expect(loginButton).toBeInTheDocument();

    // Verificar que el botón de login con Google se renderiza
    const googleButton = screen.getByText(/Login with Google/i);
    expect(googleButton).toBeInTheDocument();
  });
});