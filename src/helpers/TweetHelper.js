const shoutHelper = require('./shouts')

const isGreenTime = (date) => {
  const hour = date.getHours()
  const minutes = date.getMinutes()
  if (hour === 19 && minutes === 20) return true
  return false
}

const getShoutType = (date) => {
  const shoutsType = isGreenTime(date) ? shoutHelper.greenShouts : shoutHelper.shouts
  return shoutsType
}

const generateShout = () => {
  const shoutList = getShoutType(new Date())
  const max = Object.keys(shoutList).length
  const shoutIndex = Math.floor(Math.random() * max)
  return shoutList[shoutIndex]
}

module.exports = {
  generateShout
}