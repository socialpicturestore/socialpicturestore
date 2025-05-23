'use client'
import { type ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/shared/api/config/store'

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
