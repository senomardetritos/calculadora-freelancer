import { decode } from "next-auth/jwt";
import { editProfit, ProfitFormState } from "./actions";


describe('Edit Profit Actions', () => {

    beforeEach(() => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
    });

    it('Deve atualizar as horas', async () => {
        const formData = new FormData()
        formData.append('profit', '3000')
        const state = {} as ProfitFormState
        const response = await editProfit(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(true)
    });

    it('Deve retornar erro que dados são requeridos', async () => {
        const formData = new FormData()
        const state = {} as ProfitFormState
        const response = await editProfit(state, formData);
        expect(response).toHaveProperty('success')
        expect(response).toHaveProperty('errors')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('profit')
        expect(response.errors?.profit).toBe('Lucro é requerido')
    });
});