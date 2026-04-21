import Telegram from '@/assets/icons/telegram.svg'
import Instagram from '@/assets/icons/instagram.svg'

/** Default channel; on /messengers page Socials uses TELEGRAM_BOT_HREF instead. */
export const TELEGRAM_HREF = 'https://t.me/cita_master'
export const TELEGRAM_BOT_HREF = 'https://t.me/cita_master_bot'

const SOCIALS = [
  {
    name: 'Telegram',
    Icon: Telegram,
    link: TELEGRAM_HREF,
  },
  {
    name: 'Instagram',
    Icon: Instagram,
    link: 'https://www.instagram.com/cita.master',
  },
]

export default SOCIALS
