import { register, RegisterFormState } from "./actions";


describe('Register Actions', () => {

    it('Deve criar um usuário', async () => {
        const formData = new FormData()
        formData.append('email', 'novo@email.com')
        formData.append('name', 'Novo')
        formData.append('password', '123456')
        formData.append('repassword', '123456')
        const state = {} as RegisterFormState
        const response = await register(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(true)
    });

    it('Deve retonar erro que dados são requeridos', async () => {
        const formData = new FormData()
        const state = {} as RegisterFormState
        const response = await register(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('email')
        expect(response.errors).toHaveProperty('password')
        expect(response.errors?.email).toBe('Email é requerido')
        expect(response.errors?.name).toBe('Nome é requerido')
        expect(response.errors?.password).toBe('Senha é requerida')
        expect(response.errors?.repassword).toBe('Repetir a Senha é requerida')
    });

    it('Deve retonar erro que senhas não são iguais', async () => {
        const formData = new FormData()
        formData.append('email', 'novo@email.com')
        formData.append('name', 'Novo')
        formData.append('password', '123456')
        formData.append('repassword', '123')
        const state = {} as RegisterFormState
        const response = await register(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('repassword')
        expect(response.errors?.repassword).toBe('Senha e Repetir a Senha devem ser iguais')
    });

    it('Deve retonar erro que email ja existe', async () => {
        const formData = new FormData()
        formData.append('email', 'teste@teste.com')
        formData.append('name', 'Teste Novo')
        formData.append('password', '123456')
        formData.append('repassword', '123456')
        const state = {} as RegisterFormState
        const response = await register(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('email')
        expect(response.errors?.email).toBe('Email já está cadastrado')
    });

});