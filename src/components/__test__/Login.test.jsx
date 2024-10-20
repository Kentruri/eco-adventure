import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Login from '../Login'; 
import UserAuth from '@/hooks/UserAuth';

// Mock de UserAuth
const mockHandleLoginWithEmail = vi.fn();
const mockHandleLoginWithGoogle = vi.fn();
const mockHandleEmailChange = vi.fn();
const mockHandlePasswordChange = vi.fn();

vi.mock('@/hooks/UserAuth', () => ({
  default: () => ({
    email: '',
    password: '',
    handleEmailChange: mockHandleEmailChange,
    handlePasswordChange: mockHandlePasswordChange,
    handleLoginWithEmail: mockHandleLoginWithEmail,
    handleLoginWithGoogle: mockHandleLoginWithGoogle,
  }),
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Reseteamos los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  it('handles Google login button click', () => {
    render(<Login />);

    // Simular click en el botón de login con Google
    const googleLoginButton = screen.getByText(/login with google/i);
    fireEvent.click(googleLoginButton);

    expect(mockHandleLoginWithGoogle).toHaveBeenCalled();
  });
});