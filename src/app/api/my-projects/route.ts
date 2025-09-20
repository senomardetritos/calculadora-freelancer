import { getAuthUser } from "@/app/auth";
import { UserInterface } from "@/interfaces/user-interface";
import ProjectModel from "@/models/ProjectModel";
import { NextResponse } from "next/server";

export async function GET() {

    const user = await getAuthUser() as UserInterface;
    if (!user || !user.email) return NextResponse.json({}, { status: 401 });
    const projects = (await ProjectModel.find({ user: user.id })).map(item => {
        return {
            ...item._doc,
            id: item._id
        }
    })
    const data = projects;
    return NextResponse.json(data, { status: 200 });
}