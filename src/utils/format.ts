export function formatDate(date?: string) {
  if (!date) return ""

  const dateObject = new Date()

  const day = dateObject.getDate()
  const month = dateObject.getMonth()
  const year = dateObject.getFullYear()

  return `${day}.${month}.${year}`
}
