import { decode } from "next-auth/jwt";
import { editProjects, deleteProjects, ProjectsFormState } from "./actions";


describe('Edit Expenses Actions', () => {

    beforeEach(() => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
    });

    it('Deve atualizar a despesa', async () => {
        const formData = new FormData()
        formData.append('id', 'MockProjectId1')
        formData.append('name', 'Teste')
        formData.append('months', '1')
        formData.append('value', '100')
        const state = {} as ProjectsFormState
        const response = await editProjects(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(true)
    });

    it('Deve inserir a despesa', async () => {
        const formData = new FormData()
        formData.append('name', 'Teste')
        formData.append('months', '1')
        formData.append('value', '100')
        const state = {} as ProjectsFormState
        const response = await editProjects(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(true)
    });

    it('Deve retornar erro ao editProfile que dados são requeridos', async () => {
        const formData = new FormData()
        const state = {} as ProjectsFormState
        const response = await editProjects(state, formData);
        expect(response).toHaveProperty('success')
        expect(response).toHaveProperty('errors')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('name')
        expect(response.errors?.name).toBe('Projeto é requerido')
        expect(response.errors).toHaveProperty('months')
        expect(response.errors?.months).toBe('Meses é requerido')
        expect(response.errors).toHaveProperty('value')
        expect(response.errors?.value).toBe('Valor é requerido')
    });

    it('Deve retornar erro ao editProfile se valor ou months <= 0', async () => {
        const formData = new FormData()
        const state = {} as ProjectsFormState
        formData.append('months', '-1')
        formData.append('value', '-100')
        const response = await editProjects(state, formData);
        expect(response).toHaveProperty('success')
        expect(response).toHaveProperty('errors')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('months')
        expect(response.errors?.months).toBe('Meses é requerido')
        expect(response.errors).toHaveProperty('value')
        expect(response.errors?.value).toBe('Valor é requerido')
    });

    it('Deve deletar a despesa', async () => {
        const formData = new FormData()
        formData.append('id', 'MockProjectId1')
        const state = {} as ProjectsFormState
        const response = await deleteProjects(state, formData);
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(true)
    });

    it('Deve retornar erro ao deletar que id é requerido', async () => {
        const formData = new FormData()
        const state = {} as ProjectsFormState
        const response = await deleteProjects(state, formData);
        expect(response).toHaveProperty('success')
        expect(response).toHaveProperty('errors')
        expect(response.success).toBe(false)
        expect(response.errors).toHaveProperty('id')
        expect(response.errors?.id).toBe('Id é requerido')
    });
});