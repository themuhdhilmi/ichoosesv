import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { z } from "zod";

export async function GET(request: NextRequest, response: NextResponse) {
    try {

        const { searchParams } = new URL(request.url);

        const selection = searchParams.get("selection") as string;
        const email = searchParams.get("email") as string;

        if (selection === "EMAIL") {
            const lecturer = await prisma.user.findUniqueOrThrow({
                where: {
                    email: email,
                    role: 'LECTURER'
                }, include: {
                    LecturerInformation: {
                        include: {
                            StudentInformation: {
                                include: {
                                    User: true,
                                    SessionYear: true
                                }
                            },
                            SessionYear: true
                        }
                    }
                }
            })

            return NextResponse.json(
                {
                    lecturer
                },
                {
                    status: 400
                })

        }

        if (selection === "SESSION") {
            const sessionID = searchParams.get("sessionID") as string;

            const session = await prisma.sessionYear.findMany({
                where: {
                    id: sessionID,
                }, include: {
                    Supervisor:
                    {
                        where: {
                            User: {
                                email: email
                            }
                        }, include: {
                            User: true
                        }
                    },
                    StudentInformation: {
                        where: {
                            LecturerInformation: {
                                User: {
                                    email: email
                                }
                            }
                        }, include: {
                            User: true,
                            Member: {
                                include: {
                                    StudentInformation: {
                                        include: {
                                            User: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })



            return NextResponse.json(
                {
                    session
                },
                {
                    status: 400
                })

        }



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

const TrackEnum = z.enum(["SOFTWARE", "SECURITY", "NETWORK"]);
const schemaPOST = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
    track: TrackEnum
})
export async function POST(request: NextRequest, response: NextResponse) {

    try {
        const body = await request.json();
        const passwordEncrypt = await bcrypt.hash(body.password, 10);

        const validation = schemaPOST.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                validation.error.errors,
                {
                    status: 400
                })
        }

        // DEBUG : PLEASE ADD ADMIN VER

        const lecturer = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                hashedPassword: passwordEncrypt,
                role: 'LECTURER',
            },
        });

        const lecturerData = await prisma.lecturerInformation.create({
            data: {
                Track: body.track,
                User: {
                    connect: { id: lecturer.id }
                },
            }
        })

        return NextResponse.json(
            {
                lecturer,
                lecturerData
            },
            {
                status: 200
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

const schemaPUT = z.object({
    id: z.string(),
    name: z.string().min(4).nullable(),
    email: z.string().email().nullable(),
    password: z.string().min(4).nullable(),
    track: TrackEnum.nullable(),
})

export async function PUT(request: NextRequest, response: NextResponse) {

    try {
        const body = await request.json();

        let passwordEncrypt = null;
        if (body.password) {
            passwordEncrypt = await bcrypt.hash(body.password, 10);
        }

        const validation = schemaPUT.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                validation.error.errors,
                {
                    status: 400
                })
        }

        // DEBUG : PLEASE ADD ADMIN VER
        // DEBUG : IF USER SAME ROLE ALSO CAN RUN

        const lecturer = await prisma.user.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name !== null ? body.name : undefined,
                email: body.email !== null ? body.email : undefined,
                hashedPassword: body.password !== null ? passwordEncrypt : undefined
            },
        });

        const lecturerData = await prisma.lecturerInformation.update({
            where: {
                userId: lecturer.id
            },
            data: {
                Track: body.track !== null ? body.track : undefined,
            }
        })

        return NextResponse.json(
            {
                lecturer,
                lecturerData
            },
            {
                status: 200
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

const schemaDELETE = z.object({
    id: z.string(),
})
export async function DELETE(request: NextRequest, response: NextResponse) {

    try {
        const body = await request.json();

        const validation = schemaDELETE.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                validation.error.errors,
                {
                    status: 400
                })
        }

        // DEBUG : PLEASE ADD ADMIN VER
        // DEBUG : IF USER SAME ROLE ALSO CAN RUN

        const findLecturer = await prisma.lecturerInformation.findFirstOrThrow({
            where: {
                id: body.id
            },
            include: {
                User: true
            }
        })


        const deleteLecturer = await prisma.lecturerInformation.delete({
            where : {
                id : findLecturer.id
            }
        })

        const deleteUser = await prisma.user.delete({
            where : {
                id : findLecturer.User.id
            }
        })


        return NextResponse.json(
            {
                deleteLecturer,
                deleteUser
            },
            {
                status: 200
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