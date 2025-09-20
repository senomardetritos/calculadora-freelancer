import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import Register from './page';

describe('Register component', () => {

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
        render(<Register />);
        expect(screen.getByRole('heading', { name: 'Criar Conta' })).toBeInTheDocument();
        await waitFor(() => {

        })
    });

});