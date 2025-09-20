import { decode } from "next-auth/jwt";
import { editProfile, ProfileFormState } from "./actions";


describe('Edit Profile Actions', () => {

    beforeEach(() => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
    });

    it('Deve atualizar o profile', async () => {
        const formData = new FormData()
        formData.append('name', 'Teste 1')
        formData.append('email', 'teste@teste.com')
        const state = {} as ProfileFormState
        const response = await editProfile(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(true)
    });

    it('Deve atualizar o profile com novo email', async () => {
        const formData = new FormData()
        formData.append('name', 'Novo 1')
        formData.append('email', 'novo@teste.com')
        const state = {} as ProfileFormState
        const response = await editProfile(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(true)
    });

    it('Deve retornar erro que email já está cadastrado', async () => {
        const formData = new FormData()
        const state = {} as ProfileFormState
        formData.append('name', 'Teste 1')
        formData.append('email', 'teste2@teste.com')
        const response = await editProfile(state, formData);
        expect(response).toHaveProperty('success')
        expect(response).toHaveProperty('errors')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('email')
        expect(response.errors?.email).toBe('Email já está cadastrado')
    });

    it('Deve retornar erro que dados são requeridos', async () => {
        const formData = new FormData()
        const state = {} as ProfileFormState
        const response = await editProfile(state, formData);
        expect(response).toHaveProperty('success')
        expect(response).toHaveProperty('errors')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('name')
        expect(response.errors?.name).toBe('Nome é requerido')
        expect(response.errors).toHaveProperty('email')
        expect(response.errors?.email).toBe('Email é requerido')
    });
});