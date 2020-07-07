export function formatDate(date) {
  const month = zeroPad(date.getMonth() + 1, 2)
  const day = zeroPad(date.getDate(), 2)
  const year = date.getFullYear()

  return [month, day, year].join('-')
}

function zeroPad(num, places) {
  const zero = places - num.toString().length + 1
  return Array(+(zero > 0 && zero)).join('0') + num
}
