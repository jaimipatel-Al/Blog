export const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Ensures AM/PM format
  })
}

export default {
  formatDate,
}
