import { jest } from '@jest/globals'

export const cookies = jest.fn().mockImplementation(() => {
    return {
        get: jest.fn(),
        set: jest.fn(),
        delete: jest.fn(),
    }
});