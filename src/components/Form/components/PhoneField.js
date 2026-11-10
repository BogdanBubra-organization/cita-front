import { useId } from 'react'
import { useTranslations } from 'next-intl'
import { useController } from 'react-hook-form'
import clsx from 'clsx'
import s from '../Form.module.scss'

const PHONE_COUNTRIES = {
  '+34': { label: 'spain', example: 'XXX XXX XXX', groups: [3, 3, 3] },
  '+380': { label: 'ukraine', example: 'XX XXX XX XX', groups: [2, 3, 2, 2] },
}
const COUNTRY_CODES = Object.keys(PHONE_COUNTRIES)

const compactPhone = (number) =>
  number.replace(/[\s().-]/g, '').replace(/^00/, '+')

const parsePhone = (value, selectedCode) => {
  const number = value.replace(/[^\d+\s().-]/g, '')
  const compact = compactPhone(number)

  if (!compact.startsWith('+')) {
    return { code: selectedCode, number }
  }

  const code = COUNTRY_CODES.find((code) => compact.startsWith(code))

  return code
    ? { code, number: compact.slice(code.length) }
    : { code: '', number }
}

const applyPhoneMask = ({ code, number }) => {
  const compact = compactPhone(number)

  if (!code) {
    return /^\+?\d{0,15}$/.test(compact) ? { code, number } : null
  }

  const digits = code === '+380' ? compact.replace(/^0(?=[1-9])/, '') : compact

  // Let the first zero through so the user can type the 00 international prefix.
  if (digits !== '0' && !/^(?:[1-9]\d{0,8})?$/.test(digits)) {
    return null
  }

  let offset = 0
  const groups = PHONE_COUNTRIES[code].groups.map((size) => {
    const group = digits.slice(offset, offset + size)
    offset += size
    return group
  })

  return { code, number: groups.filter(Boolean).join(' ') }
}

export const formatPhoneNumber = ({ code, number } = { number: '' }) => {
  const compact = compactPhone(number)

  if (!code) {
    return /^\+[1-9]\d{1,14}$/.test(compact) ? compact : ''
  }

  return /^[1-9]\d{8}$/.test(compact) ? code + compact : ''
}

const PhoneField = ({ control, preferredCode, disabled }) => {
  const t = useTranslations('Form')
  const errorId = useId()
  const {
    field: { name, value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name: 'contact',
    control,
    rules: {
      validate: (phone) =>
        !!formatPhoneNumber(phone) ||
        t(phone.code ? 'phone.nationalError' : 'phone.internationalError'),
    },
  })
  const { code, number } = value
  const countryCodes = [
    preferredCode,
    ...COUNTRY_CODES.filter((prefix) => prefix !== preferredCode),
  ]

  const handleCountryChange = (event) => {
    const nextCode = event.target.value
    const phone = applyPhoneMask({ code: nextCode, number })
    onChange(phone || { code: nextCode, number: '' })
  }

  const handleNumberChange = (event) => {
    const input = event.currentTarget
    const phone = applyPhoneMask(parsePhone(input.value, code))

    if (!phone) return

    if (phone.code && phone.number !== input.value) {
      const digitsAfterCaret = input.value
        .slice(input.selectionEnd)
        .replace(/\D/g, '').length
      const digitsBeforeCaret =
        phone.number.replace(/\D/g, '').length - digitsAfterCaret
      let caret = 0

      for (let digit = 0; digit < digitsBeforeCaret; digit += 1) {
        if (phone.number[caret] === ' ') caret += 1
        caret += 1
      }

      if (
        event.nativeEvent.inputType === 'deleteContentForward' &&
        phone.number[caret] === ' '
      ) {
        caret += 1
      }

      input.value = phone.number
      input.setSelectionRange(caret, caret)
    }

    onChange(phone)
  }

  const handlePaste = (event) => {
    const pasted = event.clipboardData.getData('text')

    if (compactPhone(pasted).startsWith('+')) {
      event.preventDefault()
      const phone = applyPhoneMask(parsePhone(pasted, code))
      if (phone) onChange(phone)
    }
  }

  return (
    <div className={s.form_phone}>
      <div
        className={clsx(s.form_field, s.form_phone_controls)}
        data-state={error ? 'error' : undefined}
      >
        <div className={s.form_phone_code}>
          <span aria-hidden="true">{code || t('phone.otherShort')}</span>
          <select
            aria-label={t('phone.countryCode')}
            value={code}
            disabled={disabled}
            onBlur={onBlur}
            onChange={handleCountryChange}
          >
            {countryCodes.map((prefix) => (
              <option key={prefix} value={prefix}>
                {t(`phone.${PHONE_COUNTRIES[prefix].label}`)} {prefix}
              </option>
            ))}
            <option value="">{t('phone.other')}</option>
          </select>
        </div>
        <input
          ref={ref}
          name={name}
          type="tel"
          autoComplete="tel"
          aria-label={t('contact')}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          placeholder={PHONE_COUNTRIES[code]?.example || t('phone.fullNumber')}
          value={number}
          disabled={disabled}
          required
          onBlur={onBlur}
          onChange={handleNumberChange}
          onPaste={handlePaste}
        />
      </div>
      {error && (
        <p id={errorId} className={s.form_phone_error}>
          {error.message}
        </p>
      )}
    </div>
  )
}

export default PhoneField
