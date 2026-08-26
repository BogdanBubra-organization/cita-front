import { setRequestLocale, getTranslations } from 'next-intl/server'
import Contacts from '@/components/Contacts'
import Testimonials from '@/components/Testimonials'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Contacts' })

  return {
    title: t('metaTitle'),
    description: t('description'),
  }
}

export default async function ContactsPage({ params }) {
  const { locale } = await params

  setRequestLocale(locale)

  return (
    <>
      <Contacts variant="page" />
      <Testimonials variant="page" asPageTitle={false} />
    </>
  )
}
