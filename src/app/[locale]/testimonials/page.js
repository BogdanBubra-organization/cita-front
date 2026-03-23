import { setRequestLocale, getTranslations } from 'next-intl/server'
import Testimonials from '@/components/Testimonials'

export default async function Home({ params }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  return <Testimonials />
}
