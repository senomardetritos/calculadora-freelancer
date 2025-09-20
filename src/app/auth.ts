'use server'
import eventAuth from "@/helpers/auth-event";
import { UserInterface } from "@/interfaces/user-interface";
import UserModel from "@/models/UserModel";
import { decode, encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const getAuthUser = async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access-token')?.value
  const secret = process.env.AUTH_SECRET || '';
  const user = await decode({
    token: access_token,
    secret,
    salt: process.env.AUTH_SALT || ''
  }) as UserInterface
  if (user && user.email) {
    const data_user = await UserModel.findOne({ email: user.email })
    if (data_user && data_user.email) {
      return user
    } else {
      cookieStore.delete('access-token');
      return NextResponse.json({ error: 'Usuário não logado' }, { status: 401 });
    }
  } else {
    cookieStore.delete('access-token');
    return NextResponse.json({ error: 'Usuário não logado' }, { status: 401 });
  }
}

export const doLogin = async (payload: UserInterface) => {
  const secret = process.env.AUTH_SECRET || '';
  const encodedToken = await encode({
    token: payload,
    secret,
    maxAge: 60 * 60 * 24 * 7, // 7 dias,
    salt: process.env.AUTH_SALT || ''
  });
  const cookieStore = await cookies();
  cookieStore.set('access-token', encodedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
  });
}

export const doLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('access-token');
  eventAuth.emit('authChange', {})
  return { success: true }
}