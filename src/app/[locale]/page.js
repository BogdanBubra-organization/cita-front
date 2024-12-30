import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
import Order from '@/components/Order'
import FAQ from '@/components/FAQ'
import About from '@/components/About'
import Advantages from '@/components/Advantages'
import Services from '@/components/Services'

export default async function Home({ params }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <About />
      <Advantages />
      <Services />
      <FAQ />
      <Order />
    </>
  )
}
