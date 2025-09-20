import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import EditProfile from './page';

describe('EditProfile component', () => {

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
        render(<EditProfile />);
        expect(screen.getByText('Editar Perfil')).toBeInTheDocument();
        await waitFor(() => {

        })
    });

});