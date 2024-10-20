import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SignUp from "@/components/SignUp.jsx";
/**
 * @vitest-environment jsdom
 */

// Mock de UserAuth
const mockHandleEmailChange = vi.fn();
vi.mock('@/hooks/UserAuth', () => ({
  // __esModule: true,
  default: () => ({
    email: "",
    handleEmailChange: mockHandleEmailChange,
    password: "",
    handlePasswordChange: vi.fn(),
    handleSignUpWithEmail: vi.fn(),
    handleLoginWithGoogle: vi.fn(),
  }),
}));

describe("SignUp component", () => {
  test("calls handleEmailChange when typing in the email input", () => {
    render(<SignUp />);

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(mockHandleEmailChange).toHaveBeenCalled();
  });
});
