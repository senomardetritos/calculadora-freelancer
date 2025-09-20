import { getAuthUser } from "@/app/auth";
import { UserInterface } from "@/interfaces/user-interface";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function GET() {

    const user = await getAuthUser() as UserInterface;
    if (user && user.email) {
        const data = await UserModel.findOne({ email: user.email })
        return NextResponse.json(data, { status: 200 });
    } else {
        return NextResponse.json({ data: {} }, { status: 200 });
    }
}