const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dateInNum = `00${date.getDate()}`.slice(-2);
  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = `00${date.getHours() + 1}`.slice(-2);
  const minute = `00${date.getMinutes()}`.slice(-2);
  return `${weekday} ${dateInNum} ${month} ${year} ${hour}.${minute} BST`;
};

export default dateFormatter;
