'use strict';

const TwitterClient = require('../config/Twitter')
const TweetHelper = require('../helpers/TweetHelper')

let tries = 0

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
    tries++

    let errorMsg = 'Unexpected error'
    if (error.message) {
      errorMsg = error.message
    } else if (error && error[0] && error[0].message) {
      errorMsg = error[0].message
    }

    console.error(errorMsg, error, `tries: ${tries}`)
    
    if (error && error[0] && error[0].code === 187 && tries < 3) {
      this.handler(event, context)
    } else if (tries >= 3) {
      console.error('Reached maximum number of attempts')
    }
  }
}
