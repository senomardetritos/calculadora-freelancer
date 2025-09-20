import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import Login from './page';

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
        render(<Login />);
        expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument();
        await waitFor(() => {

        })
    });

});