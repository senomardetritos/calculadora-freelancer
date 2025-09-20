import { jest } from '@jest/globals'

export const NextResponse = jest.fn().mockImplementation(() => {
    return {
        json: jest.fn((data) => ({ json: data })),
    }
});
