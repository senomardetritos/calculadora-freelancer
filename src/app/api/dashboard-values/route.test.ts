import { decode } from 'next-auth/jwt'
import { GET } from './route';
import UserModel from '@/models/UserModel';
import ExpenseModel from '@/models/ExpenseModel';
import ProjectModel from '@/models/ProjectModel';

describe('Dashboard Values API', () => {

    it('Deve retonar 200 se usuário estiver logado', async () => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
        const response = await GET();
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('should_charge')
        expect(data).toHaveProperty('is_charging')

        const data_user = await UserModel.findOne({ email: 'teste@teste.com' })
        const data_expenses = await ExpenseModel.find()
        const expenses = data_expenses.reduce((acc, item) => {
            return acc + (item.type == 'month' ? item.value : item.value / 12)
        }, 0)
        const data_projects = await ProjectModel.find()
        const projects = data_projects.reduce((acc, item) => {
            return acc + (item.months < 1 ? item.value : item.value / item.months)
        }, 0)

        const total_value = data_user.profit + expenses
        const total_hours = data_user.hours_per_day * data_user.days_per_week * 4
        const should_charge = total_value && total_hours ? total_value / total_hours : 0
        const is_charging = projects && total_hours ? projects / total_hours : 0

        expect(data.should_charge).toBe(should_charge)
        expect(data.is_charging).toBe(is_charging)
    });

    it('Deve retonar 401 se usuário não estiver logado', async () => {
        const response = await GET();
        expect(response.status).toBe(401);
    });

});