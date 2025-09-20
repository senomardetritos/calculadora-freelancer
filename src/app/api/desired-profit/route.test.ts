import { decode } from 'next-auth/jwt'
import { GET } from './route';
import ExpenseModel from '@/models/ExpenseModel';

describe('Desired Profit API', () => {

    it('Deve retonar 200 se usuário estiver logado', async () => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
        const response = await GET();
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('expenses')

        const data_expenses = await ExpenseModel.find()
        const expenses = data_expenses.reduce((acc, item) => {
            return acc + (item.type == 'month' ? item.value : item.value / 12)
        }, 0)

        expect(data.expenses).toBe(expenses)
    });

    it('Deve retonar 401 se usuário não estiver logado', async () => {
        const response = await GET();
        expect(response.status).toBe(401);
    });

});