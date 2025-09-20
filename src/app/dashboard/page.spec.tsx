import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import DashBoard from './page';

describe('MyProjects component', () => {

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
        render(<DashBoard />);
        expect(screen.getByText('Você Precisa Cobrar')).toBeInTheDocument();
        await waitFor(() => {

        })
    });

});