'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Field from './components/Field'
import LINKS from '@/constants/links'
import cities from '@/data/cities.json'
import officeServices from '@/data/officeServices.json'
import s from './Form.module.scss'
import { BACKEND_API_URL } from "@/constants/constants";

const formatTelegramMessage = (data) => {
  let message = 'Нова заявка:\n'

  for (const [key, value] of Object.entries(data)) {
    message += `${key}: ${value}\n`
  }

  return message.trim()
}

const sendTelegramMessage = async (data) => {
  const message = formatTelegramMessage(data)

  try {
    const response = await fetch(`${BACKEND_API_URL}/web/lead-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
    })

    if (response.error) {
      console.error('Failed to send Telegram message:', response.error)
    }
  } catch (error) {
    console.error('Could not send a message to Telegram:', error)
  }
}

const getDependentOptions = (type, id) => {
  switch (type) {
    case 'services':
      return officeServices
          .filter((service) => service.cityId === id)
          .filter((value, index, self) =>
                  index === self.findIndex((t) => (
                      t.serviceId === value.serviceId
                  ))
          )
    default:
      return []
  }
}

const Form = ({ variant, handleClose }) => {
  const [submitting, setSubmitting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

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
    setSucceeded(false)
    reset()
  }

  const onSubmit = async (submissionData) => {
    setSubmitting(true)

    const updatedData = { ...submissionData }

    const city = cities.find((city) => city.id === updatedData.city)
    if (city) updatedData.city = city.name


    const service = officeServices.find(
      (service) => service.serviceId === updatedData.service
    )
    if (service) updatedData.service = service.serviceName

    const filteredData = Object.fromEntries(
      Object.entries(updatedData).filter(([key, value]) => {
        if (typeof value === 'string') {
          return value.trim() !== ''
        }
        return value !== undefined && value !== null
      })
    )

    if (Object.keys(filteredData).length === 0) {
      console.error('No valid fields to submit.')
      setSubmitting(false)
      return
    }

    try {
      await sendTelegramMessage(filteredData)
      setSucceeded(true)
      setTimeout(handleReset, 5000)
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const t = useTranslations('Form')

  const isPopup = variant === 'popup'

  const selectedCity = watch('city')

  const serviceOptions = selectedCity
    ? getDependentOptions('services', selectedCity).map((service) => ({
        value: service.serviceId,
        label: service.serviceName,
      }))
    : []

  const handleResetField = (field) => {
    setValue(field, '')
  }

  const FIELDS = [
    {
      name: 'name',
      placeholder: isPopup ? t('nameShort') : t('name'),
      isMain: true,
    },
    {
      name: 'year',
      placeholder: t('year'),
    },
    {
      name: 'passport',
      placeholder: t('passport'),
    },
    {
      name: 'phone',
      type: 'tel',
      placeholder: t('phone'),
      pattern: /^[+]?[\d() -]*\d[\d() -]{7,}$/,
    },
    {
      name: 'telegram',
      placeholder: t('telegram'),
      isMain: true,
    },
    {
      name: 'city',
      placeholder: t('region'),
      list: cities.map((city) => ({ value: city.id, label: city.name })),
      onChange: () => handleResetField('service'),
    },
    {
      name: 'service',
      placeholder: t('service'),
      list: serviceOptions,
    },
  ]

  const data = isPopup ? FIELDS.filter((item) => item.isMain) : FIELDS

  return (
    <form
      autoComplete="off"
      data-aos={isPopup ? null : 'fade-left'}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(s.form, { [s[variant]]: variant })}
    >
      {data.map((item, i) => (
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
            data-state={errors['agree'] ? 'error' : undefined}
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
