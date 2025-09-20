import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import EditProjects from './page';

describe('EditProjects component', () => {

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
        render(<EditProjects />);
        expect(screen.getByText('Meus Projetos')).toBeInTheDocument();
        await waitFor(() => {

        })
    });

});