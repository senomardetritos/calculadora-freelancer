'use server'

import ExpenseModel from "@/models/ExpenseModel";
import { getAuthUser } from "../auth";
import { UserInterface } from "@/interfaces/user-interface";

export interface ExpensesFormState { success: boolean; errors?: { [key: string]: string }; fields?: FormData; }

export async function editExpenses(prevState: ExpensesFormState, formData: FormData): Promise<ExpensesFormState> {

    const errors = { name: '', type: '', value: '' }

    if (formData.get('name') && formData.get('type') && formData.get('value')) {
        const user = await getAuthUser() as UserInterface;
        if (formData.get('id') && formData.get('id') != '') {
            await ExpenseModel.updateOne(
                { _id: formData.get('id'), user: user.id },
                {
                    name: formData.get('name'),
                    type: formData.get('type'),
                    value: formData.get('value')
                }
            )
        } else {
            await ExpenseModel.insertOne({
                name: formData.get('name'),
                type: formData.get('type'),
                value: formData.get('value'),
                user: user.id
            })
        }
        return { success: true }
    }

    if (!formData.get('name')) errors.name = 'Despesa é requerida'
    if (!formData.get('type')) errors.type = 'Tipo é requerido'
    if (!formData.get('value') || Number(formData.get('value')) <= 0) errors.value = 'Valor é requerido'

    return { success: false, errors, fields: formData }
}

export async function deleteExpenses(prevState: ExpensesFormState, formData: FormData): Promise<ExpensesFormState> {

    const user = await getAuthUser() as UserInterface;
    const errors = { id: '' }

    if (formData.get('id') && formData.get('id') != '') {
        await ExpenseModel.deleteOne(
            { _id: formData.get('id'), user: user.id }
        )
        return { success: true, errors: {}, fields: formData }
    }
    
    if (!formData.get('id')) errors.id = 'Id é requerido'
    return { success: false, errors, fields: formData }
}