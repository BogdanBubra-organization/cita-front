'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Button from '@/components/Button'
import s from './Confirmation.module.scss'

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

const getResultMessage = (t, result, value) => {
  if (result.code === 0) {
    return value ? t('results.confirmed') : t('results.declined')
  }

  if (result.code === 1) {
    return t('results.alreadyAnswered')
  }

  return getTranslatedError(t, result.code, result.message)
}

const ConfirmationActions = ({ id, dryRun = false }) => {
  const [submittingValue, setSubmittingValue] = useState(null)
  const [result, setResult] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null)
  const t = useTranslations('Confirmation')

  const isSubmitting = submittingValue !== null
  const isCompleted = result?.success || result?.code === 1

  const handleAnswer = async (value) => {
    setSubmittingValue(value)
    setSelectedValue(value)
    setResult(null)

    if (dryRun) {
      setResult({
        success: true,
        code: 0,
      })
      setSubmittingValue(null)
      return
    }

    try {
      const response = await fetch('/api/confirmation/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          value,
        }),
      })
      const data = await response.json().catch(() => null)

      if (!data) {
        setResult({
          success: false,
          code: 'invalid_response',
        })
        return
      }

      setResult({
        ...data,
        success: response.ok && data.success,
      })
    } catch {
      setResult({
        success: false,
        code: 'network',
      })
    } finally {
      setSubmittingValue(null)
    }
  }

  const feedback = result
    ? getResultMessage(t, result, selectedValue)
    : t('actions.hint')

  return (
    <div className={s.confirmation_actions}>
      {!isCompleted && (
        <div className={s.confirmation_buttons}>
          <Button disabled={isSubmitting} onClick={() => handleAnswer(true)}>
            {submittingValue === true
              ? t('actions.submitting')
              : t('actions.confirm')}
          </Button>

          <Button
            variant="secondary"
            disabled={isSubmitting}
            onClick={() => handleAnswer(false)}
          >
            {submittingValue === false
              ? t('actions.submitting')
              : t('actions.decline')}
          </Button>
        </div>
      )}

      <p
        className={clsx(s.confirmation_feedback, {
          [s.success]: result?.success,
          [s.error]: result && !result.success,
        })}
        role={result && !result.success ? 'alert' : 'status'}
        aria-live="polite"
      >
        {feedback}
      </p>
    </div>
  )
}

export default ConfirmationActions
