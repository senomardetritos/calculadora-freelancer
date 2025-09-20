import { UserInterface } from '@/interfaces/user-interface'
import { jest } from '@jest/globals'

const mockUserData = [
    {
        _id: 'MockUserId1',
        email: 'teste@teste.com',
        name: 'Teste',
        password: 'teste123',
        hours_per_day: 8,
        days_per_week: 5,
        profit: 3000,
        avatar: ''
    },
    {
        _id: 'MockUserId2',
        email: 'teste2@teste.com',
        name: 'Teste',
        password: 'teste123'
    }
]

const UserModel = {
    findOne: jest.fn((data: UserInterface) => {
        if (data.email) {
            return mockUserData.find(item => item.email == data.email)
        }
        return Promise.resolve(null)
    }),
    insertOne: jest.fn((data: UserInterface) => {
        data.id = 'MockUserId2'
        return data
    }),
    updateOne: jest.fn((data: UserInterface) => {
        data.id = 'MockUserId1'
        return data
    })
}

export default UserModel