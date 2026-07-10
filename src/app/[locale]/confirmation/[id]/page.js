import React from 'react'
import clsx from 'clsx'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import ConfirmationActions from '@/components/Confirmation/ConfirmationActions'
import {
  getConfirmationDocument,
  isValidConfirmationId,
} from '@/lib/confirmationApi'
import s from '@/components/Confirmation/Confirmation.module.scss'

export const dynamic = 'force-dynamic'

const getTranslatedError = (t, code, fallback) => {
  if (typeof code === 'string') {
    try {
      return t(`errors.${code}`)
    } catch {
      return fallback || t('errors.unknown_error')
    }
  }

  return fallback || t('errors.unknown_error')
}

const getAnswerLabel = (t, answer) => {
  if (answer === true) {
    return t('answer.confirmed')
  }

  if (answer === false) {
    return t('answer.declined')
  }

  return t('answer.pending')
}

const getAnsweredMessage = (t, answer) =>
  answer ? t('results.confirmed') : t('results.declined')

const formatTimeframeDate = (timestamp) => {
  const date = new Date(Number(timestamp) * 1000)

  if (
    timestamp === null ||
    timestamp === undefined ||
    Number.isNaN(date.getTime())
  ) {
    return null
  }

  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')

  return `${day}.${month}`
}

const getTimeframeLabel = (t, dateFrom, dateTo) => {
  const from = formatTimeframeDate(dateFrom)
  const to = formatTimeframeDate(dateTo)

  if (from && to) {
    return t('timeframe.range', { from, to })
  }

  if (from) {
    return t('timeframe.from', { from })
  }

  if (to) {
    return t('timeframe.to', { to })
  }

  return null
}

const notFoundErrorCodes = new Set(['bad_request', 'not_found'])

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Confirmation' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

const isDryRunEnabled = (searchParams) => {
  if (process.env.NODE_ENV === 'production') {
    return false
  }

  const value = searchParams?.dryRun

  return value === '1' || value === 'true'
}

const getDryRunMockData = (searchParams) => {
  if (!isDryRunEnabled(searchParams)) {
    return null
  }

  if (searchParams?.mockState === 'expired') {
    return {
      expired: true,
      clientAnswer: null,
    }
  }

  if (searchParams?.mockState === 'answered-confirmed') {
    return {
      expired: false,
      clientAnswer: true,
    }
  }

  if (searchParams?.mockState === 'answered-declined') {
    return {
      expired: false,
      clientAnswer: false,
    }
  }

  return null
}

export default async function ConfirmationPage({ params, searchParams }) {
  const { locale, id } = await params
  const query = await searchParams
  const confirmationId = id?.trim()
  const isDryRun = isDryRunEnabled(query)
  const mockData = getDryRunMockData(query)

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'Confirmation' })
  const result = mockData
    ? {
        success: true,
        data: mockData,
      }
    : isValidConfirmationId(confirmationId)
      ? await getConfirmationDocument(confirmationId)
      : {
          success: false,
          code: 'bad_request',
          message: 'Invalid confirmation identifier.',
        }

  if (!result.success && notFoundErrorCodes.has(result.code)) {
    notFound()
  }

  const data = result.success ? result.data : null
  const isExpired = data?.expired === true
  const hasAnswer = data?.clientAnswer === true || data?.clientAnswer === false
  const isFinalState = isExpired || hasAnswer
  const timeframeLabel = data
    ? getTimeframeLabel(t, data.timeframeDateFrom, data.timeframeDateTo)
    : null

  return (
    <section className={clsx('container', 'simple-page', s.confirmation)}>
      {!isFinalState && (
        <div className={s.confirmation_header}>
          <p className={s.confirmation_eyebrow}>{t('eyebrow')}</p>
          <h1 className={clsx('h2', s.confirmation_title)}>{t('title')}</h1>
          <p className="lead">{t('description')}</p>
        </div>
      )}

      {isExpired ? (
        <div className={s.confirmation_message} role="status">
          <h2 className="h3">{t('results.expiredTitle')}</h2>
          <p className={s.confirmation_error}>{t('results.expired')}</p>
        </div>
      ) : data && !hasAnswer ? (
        <div className={s.confirmation_panel}>
          <dl className={s.confirmation_details}>
            <div className={s.confirmation_row}>
              <dt className={s.confirmation_label}>{t('fields.clientName')}</dt>
              <dd className={s.confirmation_value}>{data.clientName || '-'}</dd>
            </div>

            <div className={s.confirmation_row}>
              <dt className={s.confirmation_label}>{t('fields.docNumber')}</dt>
              <dd className={s.confirmation_value}>{data.docNumber || '-'}</dd>
            </div>

            <div className={s.confirmation_row}>
              <dt className={s.confirmation_label}>{t('fields.service')}</dt>
              <dd className={s.confirmation_value}>{data.service || '-'}</dd>
            </div>

            {timeframeLabel && (
              <div className={s.confirmation_row}>
                <dt className={s.confirmation_label}>
                  {t('fields.timeframe')}
                </dt>
                <dd className={s.confirmation_value}>{timeframeLabel}</dd>
              </div>
            )}

            <div className={s.confirmation_row}>
              <dt className={s.confirmation_label}>{t('fields.answer')}</dt>
              <dd className={s.confirmation_value}>
                <span className={s.confirmation_status}>
                  {getAnswerLabel(t, data.clientAnswer)}
                </span>
              </dd>
            </div>
          </dl>

          <ConfirmationActions id={confirmationId} dryRun={isDryRun} />
        </div>
      ) : hasAnswer ? (
        <div className={s.confirmation_message} role="status">
          <h2 className="h3">{t('results.alreadyAnswered')}</h2>
          <p
            className={
              data.clientAnswer
                ? s.confirmation_success
                : s.confirmation_error
            }
          >
            {getAnsweredMessage(t, data.clientAnswer)}
          </p>
        </div>
      ) : (
        <div className={s.confirmation_message} role="alert">
          <h2 className="h3">{t('errors.title')}</h2>
          <p className={s.confirmation_error}>
            {getTranslatedError(t, result.code, result.message)}
          </p>
        </div>
      )}
    </section>
  )
}
