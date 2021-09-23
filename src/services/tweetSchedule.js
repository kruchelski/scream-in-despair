'use strict';

const TwitterClient = require('../config/Twitter')
const TweetHelper = require('../helpers/TweetHelper')
const Logger = require('../helpers/Logger')

let attempts = 0

const postTweet = async () => {
  try {
    attempts++
    if (attempts > 5) throw new Error('Reached maximum number of attempts')
    let withEmoji = false
    if (attempts > 3) {
      withEmoji = true
    }

    const status = TweetHelper.generateShout(withEmoji)

    const tweetResponse = await TwitterClient.post(
      'statuses/update',
      { status }
    )
    
    Logger.handleLog('info', 'postTweet', 'Tweet posted! 🦜')
    Logger.handleLog('info', 'postTweet', tweetResponse.text)
  } catch (error) {
    Logger.handleLog('error', 'postTweet', error, attempts)
    if (error && error[0] && error[0].code === 187) {
      await postTweet()
    }
  }
}

module.exports.handler = async (event, context) => {
  await postTweet()
}
