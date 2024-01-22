export const useFormatDate = () => {
  const formatDate = (date) => {
    if (!date || (!date.includes('/') && !date.includes('-'))) {
      throw new Error('Invalid date format');
    }

    const separator = date.includes('/') ? '/' : '-';
    const dateParts = date.split(separator);
    let day = dateParts[separator === '/' ? 0 : 2];
    let month = dateParts[separator === '/' ? 0 : 2];
    const year = dateParts[2];

    day = day.length === 1 ? '0' + day : day;
    month = month.length === 1 ? '0' + month : month;

    const formatDate = new Date(`${year}-${month}-${day}`);

    return formatDate.toISOString();
  }

  return {
    formatDate
  }
}