import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import EditExpenses from './page';

describe('EditExpenses component', () => {

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
        render(<EditExpenses />);
        expect(screen.getByText('Minhas Despesas')).toBeInTheDocument();
        await waitFor(() => {

        })
    });

});