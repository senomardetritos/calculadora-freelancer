import { jest } from '@jest/globals'

export const getToken = jest.fn()
export const encode = jest.fn(() => Promise.resolve('mocked_encoded_token'))

// export const decode = jest.fn(() => Promise.resolve({ id: 'MockUserId', email: 'teste@teste.com' }))

export const decode = jest.fn(() => Promise.resolve(null))