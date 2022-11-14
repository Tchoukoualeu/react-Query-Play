export function formatDate(date?: string) {
  if (!date) return ""

  const dateObject = new Date(date)

  const day = ("0" + dateObject.getDate()).slice(-2)
  const month = ("0" + dateObject.getMonth()).slice(-2)
  const year = dateObject.getFullYear()

  return `${day}.${month}.${year}`
}
