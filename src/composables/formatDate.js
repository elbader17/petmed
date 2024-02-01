export const useFormatDate = () => {
  const formatDate = (date) => {
    let formattedDate

    try {
      if (!date || !date.includes('/')) {
        throw new Error('Invalid date format')
      }

      const dateParts = date.split('/')

      const day = parseInt(dateParts[0])
      const month = parseInt(dateParts[1])
      const year = parseInt(dateParts[2])

      if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12) {
        throw new Error('Invalid date')
      }

      const formattedDay = day < 10 ? '0' + day : '' + day
      const formattedMonth = month < 10 ? '0' + month : '' + month

      formattedDate = new Date(`${formattedMonth}/${formattedDay}/${year}`)
    } catch (error) {
      formattedDate = new Date('01/01/2022')
    }

    return formattedDate.toISOString()
  }

  return {
    formatDate
  }
}