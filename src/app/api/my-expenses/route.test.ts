import { decode } from 'next-auth/jwt'
import { GET } from './route';
import ExpenseModel from '@/models/ExpenseModel';

describe('My Expenses API', () => {

    it('Deve retonar 200 se usuário estiver logado', async () => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
        const response = await GET();
        expect(response.status).toBe(200);
        const data = await response.json();
        const expenses = await ExpenseModel.find();
        expect(data).toBeTruthy()
        expect(data.length).toBe(expenses.length)
    });

    it('Deve retonar 401 se usuário não estiver logado', async () => {
        const response = await GET();
        expect(response.status).toBe(401);
    });

});