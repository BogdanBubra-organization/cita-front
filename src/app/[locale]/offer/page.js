import { setRequestLocale, getTranslations } from 'next-intl/server'
import Offer from '@/components/Offer'

export default async function Home({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  // Enable static rendering
  setRequestLocale(locale)

  return <Offer />
}
