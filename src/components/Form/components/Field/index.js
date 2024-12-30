import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import useClickOutside from '@/hooks/useClickOutside'
import s from './Field.module.scss'

const Field = ({
  type = 'text',
  name,
  placeholder,
  onChange,
  list,
  pattern,
  required,
  register,
  setValue,
  trigger,
  watch,
  errors,
  disabled,
  className,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentValue = watch(name)

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false))

  const handleOptionSelect = async (value) => {
    setValue(name, value)
    await trigger(name)
    setIsDropdownOpen(false)
    onChange && onChange(value)
  }

  return list ? (
    <div ref={dropdownRef} className={s.select}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        disabled={disabled || !list.length}
        value={
          list.find((option) => option.value === currentValue)?.label ||
          currentValue ||
          ''
        }
        readOnly
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        {...register(name, { required })}
        data-state={errors[name] ? 'error' : undefined}
        className={className}
      />

      {!!list.length && (
        <div className={clsx(s.select_wrapper, { [s.show]: isDropdownOpen })}>
          <div className={s.select_list}>
            {list.map((option, i) => (
              <button
                type="button"
                key={name + i}
                onClick={() => handleOptionSelect(option.value)}
                className={s.select_option}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      {...register(name, {
        required: !!required,
        pattern: pattern && { value: pattern },
      })}
      data-state={errors[name] ? 'error' : undefined}
      className={className}
    />
  )
}

export default Field
