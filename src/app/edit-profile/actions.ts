'use server'
import { UserInterface } from '@/interfaces/user-interface';
import { doLogin, getAuthUser } from '../auth';
import UserModel from '@/models/UserModel';

export interface ProfileFormState { success: boolean; errors?: { [key: string]: string }; fields?: FormData; }

export async function editProfile(prevState: ProfileFormState, formData: FormData): Promise<ProfileFormState> {

    const errors = { email: '', name: '' }

    if (formData.get('email') && formData.get('name')) {
        const user = await getAuthUser() as UserInterface;
        const exist_user = await UserModel.findOne({ email: formData.get('email') })
        if (!exist_user || user.email == formData.get('email')) {
            const data = {
                email: formData.get('email'),
                name: formData.get('name')
            }
            await UserModel.updateOne(
                { email: user.email },
                data
            )
            if (user.email != formData.get('email')) {
                const payload = {
                    id: user.id,
                    email: formData.get('email')
                } as UserInterface
                await doLogin(payload)
            }
            return { success: true }
        } else {
            errors.email = 'Email já está cadastrado'
        }
    }

    if (!formData.get('email')) errors.email = 'Email é requerido'
    if (!formData.get('name')) errors.name = 'Nome é requerido'

    return { success: false, errors, fields: formData }
}