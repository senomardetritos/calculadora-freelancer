import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { doLogout, getAuthUser } from "./auth";
import { UserInterface } from "@/interfaces/user-interface";
import { NextResponse } from "next/server";
import eventAuth from "@/helpers/auth-event";

describe('Auth', () => {

    it('Deve trazer user quando decode traz user do banco', async () => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'teste@teste.com'
        });
        const user = await getAuthUser() as UserInterface
        expect(user).toHaveProperty('email')
        expect(user.email).toBe('teste@teste.com')
    });

    it('Deve retornar erro quando decode não traz user do banco', async () => {
        (decode as jest.Mock).mockResolvedValueOnce({
            id: 'MockUserId', email: 'novo@teste.com'
        });
        const user = await getAuthUser() as NextResponse
        expect(user).toHaveProperty('status')
        expect(user.status).toBe(401)
    });

    it('Deve retornar erro quando não tiver cookie', async () => {
        (cookies as jest.Mock).mockImplementation(() => {
            return {
                get: jest.fn(() => {
                    return null;
                }),
                delete: jest.fn()
            }
        })
        const user = await getAuthUser() as NextResponse
        expect(user).toHaveProperty('status')
        expect(user.status).toBe(401)
    });

    it('Deve fazer o logout', async () => {
        const eventAuthSpy = jest.spyOn(eventAuth, 'emit')
        const response = await doLogout()
        expect(response).toHaveProperty('success')
        expect(response.success).toBe(true)
        expect(eventAuthSpy).toHaveBeenCalled()
    });

});