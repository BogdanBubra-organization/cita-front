'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import * as Dialog from '@radix-ui/react-dialog'
import Form from '../Form'
import Button from '../Button'
import Close from '@/assets/icons/close.svg'
import s from './BtnPopup.module.scss'

const BtnPopup = ({ handleClose, size, className }) => {
  const [open, setOpen] = useState(false)

  const t = useTranslations('Global')

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="primary"
          size={size}
          onClick={handleClose}
          className={className}
        >
          {t('order')}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay}>
          <Dialog.Content aria-describedby={undefined} className={s.popup}>
            <Dialog.Title asChild>
              <div className={s.popup_title}>
                {t('order')}

                <Dialog.Close asChild>
                  <button type="button" className={s.popup_close}>
                    <Close />
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Title>
            <Form variant="popup" handleClose={() => setOpen(false)} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default BtnPopup
