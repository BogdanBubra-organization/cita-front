import { setRequestLocale, getTranslations } from 'next-intl/server'
import Thankyou from '@/components/Thankyou'

export default async function ThankyouPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  // Enable static rendering
  setRequestLocale(locale)

  return <Thankyou />
}
