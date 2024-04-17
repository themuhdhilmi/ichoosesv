import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const studentAnswer = await prisma.studentAnswer.findFirst({
      where: {
        userId: body.userId,
        questionId: body.questionId,
      },
    })

    if (studentAnswer) {
      return NextResponse.json(
        {
          error: 'user already joined the question',
        },
        {
          status: 400,
        }
      )
    }

    const createNewStudentAnswer = await prisma.studentAnswer.create({
      data: {
        userId: body.userId,
        questionId: body.questionId,
      },
    })

    return NextResponse.json(
      {
        createNewStudentAnswer,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
    )
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const studentAnswer = await prisma.studentAnswer.findFirstOrThrow({
      where: {
        questionId: body.questionId,
        userId: body.userId,
      },
      include: {
        doneQuestion: true,
      },
    })

    if (!studentAnswer) {
      return NextResponse.json(
        {
          error: "user doesn't interact with this question",
        },
        {
          status: 400,
        }
      )
    }

    const updateStudentAnswer = await prisma.studentAnswer.update({
      where: {
        id: studentAnswer.id,
      },
      data: {
        totalScore: studentAnswer.totalScore + body.addScore,
        doneQuestion: {
          connect: {
            id: body.childQuestionId,
          },
        },
      },
    })

    return NextResponse.json(
      {
        updateStudentAnswer,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
    )
  }
}