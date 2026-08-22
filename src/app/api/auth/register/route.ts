import connectDb from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();

        const { name, email, password } = await req.json();

        console.log("REGISTER DATA:", { name, email, password });

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email and password are required" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password Must be Atleast 6 Characters" },
                { status: 400 }
            );
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
            return NextResponse.json(
                { message: "User already Exist" },
                { status: 400 }
            );
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        console.log("USER CREATED:", user);

        return NextResponse.json(
            { message: "User created successfully", user },
            { status: 201 }
        );

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return NextResponse.json(
            { message: `Register Error ${error}` },
            { status: 500 }
        );
    }
}