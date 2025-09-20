import { decode } from 'next-auth/jwt'
import { GET } from './route';
import UserModel from '@/models/UserModel';

describe('Hours Worked API', () => {

    it('Deve retonar 200 se usuário estiver logado', async () => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
        const response = await GET();
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('hours_per_day')
        expect(data).toHaveProperty('days_per_week')

        const data_user = await UserModel.findOne({ email: 'teste@teste.com' })

        expect(data.hours_per_day).toBe(data_user.hours_per_day)
        expect(data.days_per_week).toBe(data_user.days_per_week)
    });

    it('Deve retonar 200 se usuário estiver logado e dados de horas não existir ainda', async () => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste2@teste.com'
        });
        const response = await GET();
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('hours_per_day')
        expect(data).toHaveProperty('days_per_week')
        expect(data.hours_per_day).toBe(0)
        expect(data.days_per_week).toBe(0)
    });

    it('Deve retonar 401 se usuário não estiver logado', async () => {
        const response = await GET();
        expect(response.status).toBe(401);
    });

});