'use server'
import UserModel from '@/models/UserModel';
import { doLogin } from '../auth';
import { UserInterface } from '@/interfaces/user-interface';

export interface RegisterFormState { success: boolean; errors?: { [key: string]: string }; fields?: FormData; }

export async function register(prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> {

    const errors = { email: '', name: '', password: '', repassword: '' }

    const user = await UserModel.findOne({ email: formData.get('email') })
    if (user) {
        errors.email = 'Email já está cadastrado'
    } else if (formData.get('email') && formData.get('name') && formData.get('password') && formData.get('repassword')) {

        if (formData.get('password') != formData.get('repassword')) {
            errors.repassword = 'Senha e Repetir a Senha devem ser iguais'
        } else {
            const user = await UserModel.insertOne({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                avatar: '',
            });
            const payload = {
                id: user.id,
                email: formData.get('email')
            } as UserInterface
            await doLogin(payload)
            return { success: true }
        }
    }

    if (!formData.get('email')) errors.email = 'Email é requerido'
    if (!formData.get('name')) errors.name = 'Nome é requerido'
    if (!formData.get('password')) errors.password = 'Senha é requerida'
    if (!formData.get('repassword')) errors.repassword = 'Repetir a Senha é requerida'
    return { success: false, errors, fields: formData }
}