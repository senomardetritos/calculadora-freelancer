import { decode } from "next-auth/jwt";
import { editHours, HoursFormState } from "./actions";


describe('Edit Hours Actions', () => {

    beforeEach(() => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
    });

    it('Deve atualizar as horas', async () => {
        const formData = new FormData()
        formData.append('hours_per_day', '8')
        formData.append('days_per_week', '5')
        const state = {} as HoursFormState
        const response = await editHours(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(true)
    });

    it('Deve retornar erro que dados são requeridos', async () => {
        const formData = new FormData()
        const state = {} as HoursFormState
        const response = await editHours(state, formData);
        expect(response).toHaveProperty('success')
        expect(response).toHaveProperty('errors')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('hours_per_day')
        expect(response.errors?.hours_per_day).toBe('Horas por dia é requerido')
        expect(response.errors).toHaveProperty('days_per_week')
        expect(response.errors?.days_per_week).toBe('Dias por semana é requerido')
    });
});