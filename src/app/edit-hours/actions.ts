'use server'
import { getAuthUser } from '../auth';
import UserModel from '@/models/UserModel';
import { UserInterface } from '@/interfaces/user-interface';

export interface HoursFormState { success: boolean; errors?: { [key: string]: string }; fields?: FormData; }

export async function editHours(prevState: HoursFormState, formData: FormData): Promise<HoursFormState> {

    const errors = { hours_per_day: '', days_per_week: '' }

    if (formData.get('hours_per_day') && formData.get('days_per_week')) {
        const user = await getAuthUser() as UserInterface;
        await UserModel.updateOne(
            { email: user.email },
            {
                hours_per_day: formData.get('hours_per_day'),
                days_per_week: formData.get('days_per_week')
            }
        )
        return { success: true }
    }

    if (!formData.get('hours_per_day')) errors.hours_per_day = 'Horas por dia é requerido'
    if (!formData.get('days_per_week')) errors.days_per_week = 'Dias por semana é requerido'

    return { success: false, errors, fields: formData }
}