import { LocalStorageKeys } from '@rConfigs/localstorageKeys'
import localstorageFunctions from '@rUtils/localstorageFunctions'
import { useEffect } from 'react'

interface UseEditorDebounceProps {
  editorKey: string
  fn: (v: string) => void
}

export function useEditorDebounce({ editorKey, fn }: UseEditorDebounceProps) {
  return useEffect(() => {
    const value =
      localstorageFunctions.Get<string>(editorKey as LocalStorageKeys) ?? ''

    const interval = setInterval(() => {
      fn(value)
    }, 500)

    return () => clearInterval(interval)
  }, [editorKey, fn])
}
