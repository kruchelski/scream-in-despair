'use strict';

const TwitterClient = require('../config/Twitter')
const TweetHelper = require('../helpers/TweetHelper')

module.exports.handler = async (event, context) => {
  try {
    const status = TweetHelper.generateShout()
    const tweetResponse = await TwitterClient.post(
      'statuses/update',
      { status }
    )
    console.log('Tweet posted! 🦜')
    console.log(tweetResponse.text)
  } catch (error) {
    const errorMsg = error.message || 'Unexpected error'
    console.error(errorMsg, error)
  }
}
