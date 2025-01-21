const formatDate = (date: Date, format = 'en-GB') => {
  return date.toLocaleDateString(format)
}

export default formatDate
