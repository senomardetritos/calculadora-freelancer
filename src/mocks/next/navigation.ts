import { jest } from '@jest/globals'

export const useRouter = jest.fn().mockImplementation(() => {
    return {
        push: jest.fn()
    }
});