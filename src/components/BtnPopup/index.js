'use client'

import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import Button from '../Button'

const ConsultationPopup = dynamic(() => import('./ConsultationPopup'), {
  ssr: false,
})

const BtnPopup = ({ handleClose, size, className }) => {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const triggerRef = useRef(null)

  const t = useTranslations('Global')

  const handleOpen = (event) => {
    triggerRef.current = event.currentTarget
    handleClose?.()
    setHasOpened(true)
    setOpen(true)
  }

  const handleCloseAutoFocus = (event) => {
    event.preventDefault()
    triggerRef.current?.focus()
  }

  return (
    <>
      <Button
        variant="primary"
        size={size}
        onClick={handleOpen}
        className={className}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {t('order')}
      </Button>

      {hasOpened && (
        <ConsultationPopup
          open={open}
          onOpenChange={setOpen}
          onCloseAutoFocus={handleCloseAutoFocus}
        />
      )}
    </>
  )
}

export default BtnPopup
