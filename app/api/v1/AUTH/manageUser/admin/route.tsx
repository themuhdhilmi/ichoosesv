import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { z } from "zod";

export async function GET(request: NextRequest, response: NextResponse) {
    try {

        const admin = await prisma.user.findMany({
            where: {
                role: 'ADMIN'
            }
        })

        return NextResponse.json(
            {
                admin
            },
            {
                status: 400
            })

    } catch (error) {
        return NextResponse.json(
            {
                error
            },
            {
                status: 400
            })
    }
}