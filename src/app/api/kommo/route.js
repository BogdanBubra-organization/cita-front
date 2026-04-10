import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { name, contact } = await request.json()

    const formId = process.env.KOMMO_FORM_ID
    const formHash = process.env.KOMMO_FORM_HASH

    if (!formId || !formHash) {
      return NextResponse.json(
        {
          success: false,
          code: 'config',
        },
        { status: 500 }
      )
    }

    const formData = new FormData()

    formData.append('form_id', formId)
    formData.append('hash', formHash)
    formData.append('fields[name_2]', name || '')
    formData.append('fields[158044_1][124434]', contact || '')

    const response = await fetch('https://forms.kommo.com/queue/add/', {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    })

    const responseText = await response.text()

    if (!response.ok) {
      let code = 'request'

      if (response.status === 504) {
        code = 'timeout'
      } else if (response.status >= 500) {
        code = 'server'
      } else if (response.status >= 400) {
        code = 'request'
      }

      return NextResponse.json(
        {
          success: false,
          code,
          status: response.status,
          details: responseText || null,
        },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Kommo route error:', error)

    return NextResponse.json(
      {
        success: false,
        code: 'unknown_error',
      },
      { status: 500 }
    )
  }
}
