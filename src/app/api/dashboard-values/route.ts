import { getAuthUser } from "@/app/auth";
import { UserInterface } from "@/interfaces/user-interface";
import ExpenseModel from "@/models/ExpenseModel";
import ProjectModel from "@/models/ProjectModel";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function GET() {

    const user = await getAuthUser() as UserInterface;
    if (!user || !user.email) return NextResponse.json({}, { status: 401 });
    const data_user = await UserModel.findOne({ email: user.email })
    const data_expenses = await ExpenseModel.find({ user: user.id })
    const expenses = data_expenses.reduce((acc, item) => {
        return acc + (item.type == 'month' ? item.value : item.value / 12)
    }, 0)
    const data_projects = await ProjectModel.find({ user: user.id })
    const projects = data_projects.reduce((acc, item) => {
        return acc + (item.months < 1 ? item.value : item.value / item.months)
    }, 0)

    const total_value = (data_user.profit ? data_user.profit : 0) + expenses
    const total_hours = data_user.hours_per_day * data_user.days_per_week * 4
    const should_charge = total_value && total_hours ? total_value / total_hours : 0
    const is_charging = projects && total_hours ? projects / total_hours : 0

    const data = {
        should_charge,
        is_charging
    }
    return NextResponse.json(data, { status: 200 });
}