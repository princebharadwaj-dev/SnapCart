import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { role, mobile } = await req.json();

        if (!role || !mobile) {
            return NextResponse.json(
                { message: "Role and mobile are required" },
                { status: 400 }
            );
        }

        await connectDb();

        const user = await User.findOneAndUpdate(
            { email: session.user.email },
            {
                role,
                mobile,
            },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { message: "User Not Found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Role and mobile updated successfully",
                user,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Edit Role and Mobile Error:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}