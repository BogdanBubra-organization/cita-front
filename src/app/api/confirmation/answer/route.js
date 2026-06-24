import { NextResponse } from 'next/server'
import {
  isValidConfirmationId,
  sendConfirmationAnswer,
} from '@/lib/confirmationApi'

const getStatus = (result) => {
  if (result.success || typeof result.code === 'number') {
    return 200
  }

  if (result.status) {
    return result.status === 0 ? 502 : result.status
  }

  if (result.code === 'bad_request') {
    return 400
  }

  if (result.code === 'config') {
    return 500
  }

  if (result.code === 'network') {
    return 502
  }

  return 500
}

export async function POST(request) {
  try {
    const { id, value } = await request.json()

    if (!isValidConfirmationId(id) || typeof value !== 'boolean') {
      return NextResponse.json(
        {
          success: false,
          code: 'bad_request',
          message: 'Invalid confirmation answer request.',
        },
        { status: 400 }
      )
    }

    const result = await sendConfirmationAnswer(id.trim(), value)

    return NextResponse.json(result, {
      status: getStatus(result),
    })
  } catch (error) {
    console.error('Confirmation answer route error:', error)

    return NextResponse.json(
      {
        success: false,
        code: 'unknown_error',
        message: 'Unexpected confirmation answer error.',
      },
      { status: 500 }
    )
  }
}
