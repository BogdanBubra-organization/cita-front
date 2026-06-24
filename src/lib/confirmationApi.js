import https from 'node:https'

const jsonContentType = 'application/json'

export const isValidConfirmationId = (id) =>
  typeof id === 'string' && /^[A-Za-z0-9_-]+$/.test(id.trim())

const getConfirmationConfig = () => {
  const baseUrl = process.env.CONFIRMATION_API_BASE_URL?.trim().replace(
    /\/+$/,
    ''
  )
  const token = process.env.CONFIRMATION_API_TOKEN?.trim()

  if (!baseUrl || !token) {
    return {
      error: {
        success: false,
        code: 'config',
        message: 'Confirmation API is not configured.',
      },
    }
  }

  return {
    baseUrl,
    token,
  }
}

const getHttpErrorCode = (status) => {
  if (status === 400) {
    return 'bad_request'
  }

  if (status === 401) {
    return 'unauthorized'
  }

  if (status === 404) {
    return 'not_found'
  }

  if (status === 429) {
    return 'too_many_requests'
  }

  if (status >= 500) {
    return 'server'
  }

  return 'request'
}

const readResponseBody = async (response) => {
  const text = await response.text()

  if (!text) {
    return {
      text,
      json: null,
    }
  }

  try {
    return {
      text,
      json: JSON.parse(text),
    }
  } catch {
    return {
      text,
      json: null,
    }
  }
}

const buildUrl = (baseUrl, pathname, searchParams) => {
  const url = new URL(`${baseUrl}/${pathname}`)

  Object.entries(searchParams || {}).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return url
}

const requestUrl = (url, token) =>
  new Promise((resolve, reject) => {
    const request = https.request(
      url,
      {
        headers: {
          Accept: jsonContentType,
          'X-Authorization': token,
        },
        rejectUnauthorized: false,
      },
      (response) => {
        let text = ''

        response.setEncoding('utf8')
        response.on('data', (chunk) => {
          text += chunk
        })
        response.on('end', () => {
          resolve({
            ok: response.statusCode >= 200 && response.statusCode < 300,
            status: response.statusCode,
            statusText: response.statusMessage,
            text: async () => text,
          })
        })
      }
    )

    request.setTimeout(15000, () => {
      request.destroy(new Error('Confirmation API request timed out.'))
    })

    request.on('error', reject)
    request.end()
  })

const requestConfirmationApi = async (pathname, searchParams) => {
  const config = getConfirmationConfig()

  if (config.error) {
    return config.error
  }

  try {
    const response = await requestUrl(
      buildUrl(config.baseUrl, pathname, searchParams),
      config.token
    )

    const body = await readResponseBody(response)

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        code: getHttpErrorCode(response.status),
        message:
          body.json?.message ||
          response.statusText ||
          'Confirmation API request failed.',
      }
    }

    if (!body.json) {
      return {
        success: false,
        code: 'invalid_response',
        message: 'Confirmation API returned invalid JSON.',
      }
    }

    return {
      success: true,
      status: response.status,
      data: body.json,
    }
  } catch (error) {
    console.warn(
      'Confirmation API request failed:',
      error instanceof Error ? error.message : error
    )

    return {
      success: false,
      status: 0,
      code: 'network',
      message: 'Confirmation API is unavailable.',
    }
  }
}

export const getConfirmationDocument = async (id) => {
  if (!isValidConfirmationId(id)) {
    return {
      success: false,
      code: 'bad_request',
      message: 'Invalid confirmation identifier.',
    }
  }

  const result = await requestConfirmationApi(`${encodeURIComponent(id)}/get`)

  if (!result.success) {
    return result
  }

  const { code, message, data } = result.data

  if (code !== 0 || !data) {
    return {
      success: false,
      code: code ?? 'invalid_response',
      message: message || 'Confirmation API returned an error.',
    }
  }

  return {
    success: true,
    code,
    message,
    data,
  }
}

export const sendConfirmationAnswer = async (id, value) => {
  if (!isValidConfirmationId(id) || typeof value !== 'boolean') {
    return {
      success: false,
      code: 'bad_request',
      message: 'Invalid confirmation answer request.',
    }
  }

  const result = await requestConfirmationApi(
    `${encodeURIComponent(id)}/answer`,
    {
      value: value ? 'true' : 'false',
    }
  )

  if (!result.success) {
    return result
  }

  const { code, message } = result.data

  return {
    success: code === 0,
    code,
    message: message || 'Ok',
  }
}
