

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, test } from 'vitest'
import LoginPage from '../app/page';
import { vi } from 'vitest'

vi.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('All Basic Elements Present', () => {
    test('Email input, label are rendered', () => {
        render(<LoginPage />); // Render your component   
        // Use getByRole to target elements by their accessibility roles
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const emailLabel = screen.getByLabelText(/email address/i);

        expect(emailInput).toBeDefined()
        expect(emailLabel).toBeDefined()
    });

    test('Password input, label are rendered', () => {
        render(<LoginPage />);

        const passwordInput = screen.getByPlaceholderText('••••••••');
        const passwordLabel = screen.getByLabelText(/password/i);

        expect(passwordInput).toBeDefined()
        expect(passwordLabel).toBeDefined()
    });

    test('Login button is rendered', () => {
        render(<LoginPage />);

        const loginButton = screen.getByRole('button', { name: /login/i });
        expect(loginButton).toBeDefined();
    });

    test('displays error messages for Empty input', async () => {
        
        render(<LoginPage />);

        const passwordInput = screen.getByPlaceholderText('••••••••');
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const loginButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.submit(loginButton);

        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeDefined()
            expect(screen.getByText(/Password is required/i)).toBeDefined()
        });
    });

    test('displays error messages for Invalid input', async () => {
        
        render(<LoginPage />);

        const passwordInput = screen.getByPlaceholderText('••••••••');
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const loginButton = screen.getByRole('button', { name: /login/i });
        
        fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
        fireEvent.change(passwordInput, { target: { value: 'invalid' } });
        fireEvent.submit(loginButton);

        await waitFor(() => {
            expect(screen.getByText(/Invalid email format/i)).toBeDefined()
            expect(screen.getByText(/Password must be at least 8 characters/i)).toBeDefined()
        });
    });
});
