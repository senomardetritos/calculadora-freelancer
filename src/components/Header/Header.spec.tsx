import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import { Header } from './Header';
import UserModel from '@/models/UserModel';

describe('Header component', () => {

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
        render(<Header />);
        expect(screen.getByText('CalcFreela')).toBeInTheDocument();
        await waitFor(async () => {
            const user = await UserModel.findOne({ email: 'teste@teste.com' })
            expect(screen.getByText(user.name)).toBeInTheDocument();
        })
    });

});