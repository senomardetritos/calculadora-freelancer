import UserModel from "@/models/UserModel";
import { login, LoginFormState } from "./actions";


describe('Login Actions', () => {

    it('Deve logar com usuário mocado', async () => {
        const formData = new FormData()
        const data_user = await UserModel.findOne({ email: 'teste@teste.com' })
        formData.append('email', data_user.email)
        formData.append('password', data_user.password)
        const state = {} as LoginFormState
        const response = await login(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(true)
    });

    it('Deve retonar erro que email e senha são requeridos', async () => {
        const formData = new FormData()
        const state = {} as LoginFormState
        const response = await login(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('email')
        expect(response.errors?.email).toBe('Email é requerido')
        expect(response.errors).toHaveProperty('password')
        expect(response.errors?.password).toBe('Senha é requerida')
    });

    it('Deve retonar erro que email não existe', async () => {
        const formData = new FormData()
        formData.append('email', 'email@nao.com')
        const state = {} as LoginFormState
        const response = await login(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('email')
        expect(response.errors?.email).toBe('Email não encontrado')
    });

    it('Deve retonar erro que senha é incorreta', async () => {
        const formData = new FormData()
        const data_user = await UserModel.findOne({ email: 'teste@teste.com' })
        formData.append('email', data_user.email)
        formData.append('password', '123456')
        const state = {} as LoginFormState
        const response = await login(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('password')
        expect(response.errors?.password).toBe('Senha incorreta')
    });

});