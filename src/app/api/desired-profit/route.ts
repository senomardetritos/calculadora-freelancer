import { getAuthUser } from "@/app/auth";
import { UserInterface } from "@/interfaces/user-interface";
import ExpenseModel from "@/models/ExpenseModel";
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

    const data = {
        id: data_user.id,
        profit: data_user.profit ?? 0,
        expenses
    }
    return NextResponse.json(data, { status: 200 });
}