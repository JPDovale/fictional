export function makeImageLocation(imageName?: string | null) {
  if (!imageName) return null
  return `http://localhost:4141/images/${imageName}`
}
