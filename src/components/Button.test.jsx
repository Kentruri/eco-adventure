import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button component', () => {
  it('should render correctly with a label', () => {
    render(<Button label="Click me" onClick={() => {}} />);

    // Verificar si el texto del botón es el correcto
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn(); // Mock de la función onClick
    render(<Button label="Click me" onClick={onClick} />);

    const button = screen.getByText('Click me');
    
    // Simular un clic en el botón
    fireEvent.click(button);

    // Verificar que la función onClick fue llamada
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});