'use server'
import { checkAccountTest, getAuthUser } from '../auth';
import UserModel from '@/models/UserModel';
import { UserInterface } from '@/interfaces/user-interface';

export interface ProfitFormState { success: boolean; errors?: { [key: string]: string }; fields?: FormData; }

export async function editProfit(prevState: ProfitFormState, formData: FormData): Promise<ProfitFormState> {

    const errors = { profit: '' }

    if (formData.get('profit')) {
        const user = await getAuthUser() as UserInterface;
        const accountTest = await checkAccountTest(user)
        if (accountTest) return { success: false, errors: accountTest, fields: formData }
        await UserModel.updateOne(
            { email: user.email },
            { profit: formData.get('profit') }
        )
        return { success: true }
    }

    if (!formData.get('profit')) errors.profit = 'Lucro é requerido'

    return { success: false, errors, fields: formData }
}