const shoutHelper = require('./shouts')
const LoggerHelper = require('./Logger')

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

const generateShout = (emoji = false) => {
  const shoutList = getShoutType(new Date())
  const max = shoutList.length
  const shoutIndex = Math.floor(Math.random() * max)
  let generatedShout = shoutList[shoutIndex]
  if (emoji) {
    const maxEmojiIndex = shoutHelper.fallbackEmojis.length
    const emojiIndex = Math.floor(Math.random() * maxEmojiIndex)
    generatedShout += ` ${shoutHelper.fallbackEmojis[emojiIndex]}`
  }
  LoggerHelper.handleLog('info', 'generateShout', `Shout: ${generatedShout}`)
  return generatedShout
}

module.exports = {
  generateShout
}