import { decode } from 'next-auth/jwt'
import { GET } from './route';
import ProjectModel from '@/models/ProjectModel';

describe('My Projects API', () => {

    it('Deve retonar 200 se usuário estiver logado', async () => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
        const response = await GET();
        expect(response.status).toBe(200);
        const data = await response.json();
        const projects = await ProjectModel.find();
        expect(data).toBeTruthy()
        expect(data.length).toBe(projects.length)
    });

    it('Deve retonar 401 se usuário não estiver logado', async () => {
        const response = await GET();
        expect(response.status).toBe(401);
    });

});