'use client'

import dynamic from 'next/dynamic'
import useNearViewport from '@/hooks/useNearViewport'
import s from './DeferredForm.module.scss'

const Form = dynamic(() => import('./index'), { ssr: false })

const DeferredForm = () => {
  const { elementRef, isNearViewport } = useNearViewport()

  return (
    <div ref={elementRef} className={s.placeholder}>
      {isNearViewport && <Form variant="order" />}
    </div>
  )
}

export default DeferredForm
