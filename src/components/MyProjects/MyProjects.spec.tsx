import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import { MyProjects } from './MyProjects';

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
        render(<MyProjects />);
        expect(screen.getByText('Meus Projetos')).toBeInTheDocument();
        await waitFor(() => {

        })
    });

});