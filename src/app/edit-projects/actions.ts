'use server'

import ProjectModel from "@/models/ProjectModel";
import { checkAccountTest, getAuthUser } from "../auth";
import { UserInterface } from "@/interfaces/user-interface";

export interface ProjectsFormState { success: boolean; errors?: { [key: string]: string }; fields?: FormData; }

export async function editProjects(prevState: ProjectsFormState, formData: FormData): Promise<ProjectsFormState> {

    const errors = { name: '', months: '', value: '' }

    if (formData.get('name') && formData.get('months') && formData.get('value')) {
        const user = await getAuthUser() as UserInterface;
        const accountTest = await checkAccountTest(user)
        if (accountTest) return { success: false, errors: accountTest, fields: formData }

        if (formData.get('id') && formData.get('id') != '') {
            await ProjectModel.updateOne(
                { _id: formData.get('id'), user: user.id },
                {
                    name: formData.get('name'),
                    months: formData.get('months'),
                    value: formData.get('value')
                }
            )
        } else {
            await ProjectModel.insertOne({
                name: formData.get('name'),
                months: formData.get('months'),
                value: formData.get('value'),
                user: user.id
            })
        }
        return { success: true }
    }

    if (!formData.get('name')) errors.name = 'Projeto é requerido'
    if (!formData.get('months') || Number(formData.get('months')) <= 0) errors.months = 'Meses é requerido'
    if (!formData.get('value') || Number(formData.get('value')) <= 0) errors.value = 'Valor é requerido'

    return { success: false, errors, fields: formData }
}

export async function deleteProjects(prevState: ProjectsFormState, formData: FormData): Promise<ProjectsFormState> {

    const user = await getAuthUser() as UserInterface;
    const accountTest = await checkAccountTest(user)
    if (accountTest) return { success: false, errors: accountTest, fields: formData }
    
    const errors = { id: '' }

    if (formData.get('id') && formData.get('id') != '') {
        await ProjectModel.deleteOne(
            { _id: formData.get('id'), user: user.id }
        )
        return { success: true, errors: {}, fields: formData }
    }

    if (!formData.get('id')) errors.id = 'Id é requerido'

    return { success: false, errors, fields: formData }
}