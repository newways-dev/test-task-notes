export const getCurrentDate = () => {
  const now = new Date()
  const today = now.getDate()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  const currentDate = `${today}.${month}.${year}`

  return `${currentDate}, ${hours}:${minutes}`
}
