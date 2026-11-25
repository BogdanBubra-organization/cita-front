import { getTranslations } from 'next-intl/server'
import OfferUK from './uk'
import OfferEN from './en'
import OfferES from './es'

const content = { uk: OfferUK, en: OfferEN, es: OfferES }

export default async function Offer({ locale }) {
	const t = await getTranslations({ locale, namespace: 'Offer' })
	const Content = content[locale] ?? OfferUK

	return (
		<section className="container simple-page">
			<h1 className="h2">{t('title')}</h1>
			<Content />
		</section>
	)
}