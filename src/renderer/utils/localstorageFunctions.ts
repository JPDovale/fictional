import { LocalStorageKeys } from '../configs/localstorageKeys'

function Get<T = unknown>(key: LocalStorageKeys): T | null {
  const item = localStorage.getItem(key)

  return item ? (JSON.parse(item) as T) : null
}

function Set(key: LocalStorageKeys, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

function Remove(key: LocalStorageKeys) {
  localStorage.removeItem(key)
}

export default { Get, Set, Remove }
