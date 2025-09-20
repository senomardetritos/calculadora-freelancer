import { ExpenseInterface } from '@/interfaces/expense-interface'
import { jest } from '@jest/globals'

const mockExpenseData = [
    { _id: 'MockExpenseId1', name: 'Teste 01', type: 'month', value: 100, user: 'MockUserId1', },
    { _id: 'MockExpenseId2', name: 'Teste 02', type: 'year', value: 100, user: 'MockUserId1', }
]

const ExpenseModel = {
    find: jest.fn(() => Promise.resolve(mockExpenseData)),
    findOne: jest.fn(() => Promise.resolve((data: ExpenseInterface) => {
        return mockExpenseData.filter(item => item._id == data.id)
    })),
    insertOne: jest.fn((data: ExpenseInterface) => {
        data.id = 'MockExpenseId2'
        return data
    }),
    updateOne: jest.fn((data: ExpenseInterface) => {
        data.id = 'MockExpenseId1'
        return data
    }),
    deleteOne: jest.fn()
}

export default ExpenseModel