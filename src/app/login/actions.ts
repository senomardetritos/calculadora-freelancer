'use server'
import UserModel from '@/models/UserModel';
import { doLogin } from '../auth';
import { UserInterface } from '@/interfaces/user-interface';

export interface LoginFormState { success: boolean; errors?: { [key: string]: string }; fields?: FormData; }

export async function login(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {

    const user = await UserModel.findOne({ email: formData.get('email') })

    const errors = { email: '', password: '' }

    if (user) {
        if (formData.get('password') == user.password) {
            const payload = {
                id: user.id,
                email: formData.get('email')
            } as UserInterface
            await doLogin(payload)
            return { success: true }
        } else {
            errors.password = 'Senha incorreta'
        }
    } else {
        errors.email = 'Email não encontrado'
    }
    if (!formData.get('email')) errors.email = 'Email é requerido'
    if (!formData.get('password')) errors.password = 'Senha é requerida'
    return { success: false, errors, fields: formData }
}