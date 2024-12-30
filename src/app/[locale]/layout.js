import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Montserrat, Montserrat_Alternates } from 'next/font/google'
import Header from '@/components/Header'
import Coockies from '@/components/Coockies'
import Footer from '@/components/Footer'
import { AOSInit } from '@/components/AOS'
import '../globals.scss'

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-montserrat',
})
const montserrat_alternates = Montserrat_Alternates({
  weight: ['500', '600'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-montserrat-alternates',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  if (!routing.locales.includes(locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
    description: t('descr'),
    openGraph: {
      images: [`/og-image-${locale}.png`],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${montserrat_alternates.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <AOSInit />
          <Header />
          <main>{children}</main>
          <Footer />
          <Coockies />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
