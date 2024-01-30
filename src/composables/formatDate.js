export const useFormatDate = () => {
  const formatDate = (date) => {
    if (!date || (!date.includes('/'))) {
      throw new Error('Invalid date format');
    }

    const dateParts = date.split('/');

    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];

    const formattedDay = day.length === 1 ? '0' + day : day;
    const formattedMonth = month.length === 1 ? '0' + month : month;

    const formattedDate = new Date(`${formattedMonth}/${formattedDay}/${year}`);

    return formattedDate.toISOString();
  }

  return {
    formatDate
  }
}