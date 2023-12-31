import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponce, NextResponse } from "next/dist/server/web/exports/next-response";

export async function POST(
    request: Request
    ) {
        try {
        const body = await request.json();
        const {
           email,
           name,
           password
        } = body;

        if (!email || !name || !password) {
            return new NextResponce('Missing info', { status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        return NextResponse.json(user);

    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR');
        return new NextResponce('Internal Error', {status:500});
    }


}