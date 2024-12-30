import { setRequestLocale, getTranslations } from 'next-intl/server'
import Policy from '@/components/Policy'

export default async function Home({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  // Enable static rendering
  setRequestLocale(locale)

  return <Policy />
}
