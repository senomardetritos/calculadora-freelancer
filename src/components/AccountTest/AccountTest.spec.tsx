import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import AccountTest from './AccountTest';

describe('Login component', () => {

    beforeEach(async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: async () => [],
            } as Response)
        );
    })

    it('Deve renderizar o children', async () => {
        render(<AccountTest />);
        expect(screen.getByRole('button', { name: 'Entrar com Credenciais de Teste' })).toBeInTheDocument();
        await waitFor(() => {

        })
    });

});