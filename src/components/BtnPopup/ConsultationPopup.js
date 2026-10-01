'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useTranslations } from 'next-intl'
import Form from '../Form'
import Close from '@/assets/icons/close.svg'
import s from './BtnPopup.module.scss'

const ConsultationPopup = ({ open, onOpenChange, onCloseAutoFocus }) => {
  const t = useTranslations('Global')

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay}>
          <Dialog.Content
            aria-describedby={undefined}
            onCloseAutoFocus={onCloseAutoFocus}
            className={s.popup}
          >
            <Dialog.Title asChild>
              <div className={s.popup_title}>
                {t('order')}

                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close"
                    className={s.popup_close}
                  >
                    <Close />
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Title>
            <Form variant="popup" handleClose={() => onOpenChange(false)} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ConsultationPopup
