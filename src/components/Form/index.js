'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/routing'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Field from './components/Field'
import LINKS from '@/constants/links'
import s from './Form.module.scss'

const sendKommoLead = async ({ name, contact }) => {
  const response = await fetch('/api/kommo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      contact,
    }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok || !data?.success) {
    throw new Error(data?.code || 'unknown_error')
  }

  return data
}

const Form = ({ variant, handleClose }) => {
  const [submitting, setSubmitting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const router = useRouter()
  const t = useTranslations('Form')

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
  } = useForm({
    shouldUnregister: true,
  })

  const handleReset = () => {
    handleClose && handleClose()
    reset()
  }

  const onSubmit = async (submissionData) => {
    setSubmitting(true)
    setSubmitError('')
    setSucceeded(false)

    const filteredData = Object.fromEntries(
      Object.entries(submissionData).filter(([_, value]) => {
        if (typeof value === 'string') {
          return value.trim() !== ''
        }

        return value !== undefined && value !== null
      })
    )

    if (Object.keys(filteredData).length === 0) {
      setSubmitError(t('errors.empty'))
      setSubmitting(false)
      return
    }

    try {
      await sendKommoLead(filteredData)

      setSucceeded(true)
      handleReset()
      router.push('/thankyou')
    } catch (error) {
      const errorCode = error instanceof Error ? error.message : 'unknown_error'

      let errorMessage = t('errors.unknown_error')

      try {
        errorMessage = t(`errors.${errorCode}`)
      } catch {
        errorMessage = t('errors.unknown_error')
      }

      setSubmitError(errorMessage)
      setSucceeded(false)
    } finally {
      setSubmitting(false)
    }
  }

  const isPopup = variant === 'popup'

  const FIELDS = [
    {
      name: 'name',
      placeholder: t('nameShort'),
    },
    {
      name: 'contact',
      placeholder: t('contact'),
      inputMode: 'tel',
      pattern: /^[0-9+\-() ]+$/,
      sanitize: (value) => value.replace(/[^0-9+\-() ]/g, ''),
    },
  ]

  return (
    <form
      autoComplete="off"
      data-aos={isPopup ? null : 'fade-left'}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(s.form, { [s[variant]]: variant })}
    >
      {FIELDS.map((item, i) => (
        <Field
          key={'f' + i}
          {...item}
          required={true}
          register={register}
          setValue={setValue}
          trigger={trigger}
          watch={watch}
          errors={errors}
          disabled={submitting || succeeded}
          className={s.form_field}
        />
      ))}

      {!isPopup && (LINKS.policy || LINKS.offer) && (
        <label className={s.form_check}>
          <input
            type="checkbox"
            name="agree"
            disabled={submitting || succeeded}
            data-state={errors.agree ? 'error' : undefined}
            {...register('agree', {
              required: true,
            })}
          />
          {t.rich('agree', {
            policy: (chunks) => (
              <Link
                href={LINKS.policy || ''}
                className={clsx({ [s.form_hide]: !LINKS.policy })}
              >
                {chunks}
              </Link>
            ),
            offer: (chunks) => (
              <Link
                href={LINKS.offer || ''}
                className={clsx({ [s.form_hide]: !LINKS.offer })}
              >
                {chunks}
              </Link>
            ),
            extra: (chunks) => (
              <span
                className={clsx({
                  [s.form_hide]: !LINKS.offer || !LINKS.policy,
                })}
              >
                {chunks}
              </span>
            ),
          })}
        </label>
      )}

      {submitError && (
        <div className={s.form_error} role="alert">
          {submitError}
        </div>
      )}

      <Button
        type="submit"
        disabled={submitting || succeeded}
        className={clsx(s.form_btn, { [s.success]: succeeded })}
      >
        {succeeded
          ? isPopup
            ? t('successShort')
            : t('success')
          : isPopup
            ? t('submitShort')
            : t('submit')}
      </Button>
    </form>
  )
}

export default Form
