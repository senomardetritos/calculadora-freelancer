import { decode } from 'next-auth/jwt'
import { GET } from './route';
import UserModel from '@/models/UserModel';

describe('My Profile API', () => {

    it('Deve retonar 200 se usuário estiver logado', async () => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
        const response = await GET();
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('email')
        expect(data).toHaveProperty('name')

        const data_user = await UserModel.findOne({ email: 'teste@teste.com' })

        expect(data.email).toBe(data_user.email)
        expect(data.name).toBe(data_user.name)
    });

    it('Deve retonar 200 mas sem dados se usuário não estiver logado', async () => {
        const response = await GET();
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).not.toHaveProperty('email')
        expect(data).not.toHaveProperty('name')
    });

});