import { getAuthUser } from "@/app/auth";
import { UserInterface } from "@/interfaces/user-interface";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await getAuthUser() as UserInterface;
    if (!user || !user.email) return NextResponse.json({}, { status: 401 });
    const data_user = await UserModel.findOne({ email: user.email })
    const data = {
        id: data_user.id,
        hours_per_day: data_user.hours_per_day ?? 0,
        days_per_week: data_user.days_per_week ?? 0,
    }
    return NextResponse.json(data, { status: 200 });
}