import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import { MyExpenses } from './MyExpenses';

describe('MyExpenses component', () => {

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
        render(<MyExpenses />);
        expect(screen.getByText('Minhas Despesas Mensais')).toBeInTheDocument();
        await waitFor(() => {

        })
    });

});