import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import EditHours from './page';
import UserModel from '@/models/UserModel';

describe('EditHours component', () => {

    beforeEach(async () => {
        const user = await UserModel.findOne({ email: 'teste@teste.com' })
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: async () => user,
            } as Response)
        );
    })

    it('Deve renderizar o children', async () => {
        render(<EditHours />);
        expect(screen.getByText('Horas Trabalhadas')).toBeInTheDocument();
        
        await waitFor(() => {

        })
    });

});