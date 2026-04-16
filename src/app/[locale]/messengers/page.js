import { setRequestLocale, getTranslations } from 'next-intl/server'
import Messengers from '@/components/Messengers'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Messengers' })

  return {
    title: t('metaTitle'),
    description: t('description'),
  }
}

export default async function MessengersPage({ params }) {
  const { locale } = await params

  setRequestLocale(locale)

  return <Messengers />
}
