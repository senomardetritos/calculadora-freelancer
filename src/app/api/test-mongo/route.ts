import { MongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {

    const mongoose = await MongoDB()
    const data = await mongoose.model('User').findOne()
    // mongoose.modelNames();
    return NextResponse.json(data, { status: 200 });
}