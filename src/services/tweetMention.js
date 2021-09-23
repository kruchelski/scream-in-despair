'use strict';

const TwitterClient = require('../config/Twitter')
const TweetHelper = require('../helpers/TweetHelper')
const Logger = require('../helpers/Logger')

let attempts = 0

const getMentionTweets = async () => {
  try {
    return await TwitterClient.get('statuses/mentions_timeline',
      {count: 100}
    )
  } catch (error) {
    Logger.handleLog('error', 'getMentionTweets', error, attempts)
    return []
  } 
}

const filterRecentTweets = (mentions) => {
  try {
    const date = new Date()
    date.setSeconds(0)
    const toDateInMs = date.valueOf()
    date.setMinutes(date.getMinutes() - 1)
    const fromDateInMs = date.valueOf()
    const filteredMentions = mentions.filter(mention => {
      const createDate = new Date(mention.created_at)
      const createDateMs = createDate.valueOf()
      if (createDateMs >= fromDateInMs && createDateMs < toDateInMs) {
        return mention
      }
    })
    return filteredMentions
  } catch (error) {
    Logger.handleLog('error', 'filterRecentTweets', error, attempts)
    return []
  }
}

const postTweet = async (user) => {
  try {
    attempts++
    if (attempts > 5) throw new Error('Reached maximum number of attempts')
    let withEmoji = false
    if (attempts > 3) {
      withEmoji = true
    }

    const status = `${user} ${TweetHelper.generateShout(withEmoji)}`
  
    const tweetResponse = await TwitterClient.post(
      'statuses/update',
      { status }
    )
    
    Logger.handleLog('info', 'postTweet', 'Tweet posted! 🦜')
    Logger.handleLog('info', 'postTweet', tweetResponse.text)
  } catch (error) {
    Logger.handleLog('error', 'postTweet', error, attempts)
    if (error && error[0] && error[0].code === 187) {
      await postTweet(user)
    }
  }
}

module.exports.handler = async (event, context) => {
  const mentions = await getMentionTweets()
  const recentMentions = filterRecentTweets(mentions)
  const promises = recentMentions.map(mention => postTweet(`@${mention.user.screen_name}`))
  await Promise.all(promises)
}
