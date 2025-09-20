import { ProjectInterface } from '@/interfaces/project-interface'
import { jest } from '@jest/globals'

const mockProjectData = [
    { _id: 'MockProjectId1', name: 'Teste 01', months: 1, value: 100, user: 'MockUserId', },
    { _id: 'MockProjectId2', name: 'Teste 02', months: 0.5, value: 100, user: 'MockUserId', }
]

const ProjectModel = {
    find: jest.fn(() => Promise.resolve(mockProjectData)),
    findOne: jest.fn(() => Promise.resolve((data: ProjectInterface) => {
        return mockProjectData.filter(item => item._id == data.id)
    })),
    insertOne: jest.fn((data: ProjectInterface) => {
        data.id = 'MockExpenseId2'
        return data
    }),
    updateOne: jest.fn((data: ProjectInterface) => {
        data.id = 'MockExpenseId1'
        return data
    }),
    deleteOne: jest.fn()
}

export default ProjectModel