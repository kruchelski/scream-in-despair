const possibleChars = {
  0: 'a',
  1: 'e',
  2: 'A',
  3: 'E',
  4: 'o',
  5: ' ',
  6: 'H',
  7: 'I',
  8: 'i',
  9: 'A',
  10: 'h',
  11: 'u',
  12: ' ',
  13: 'O',
  14: 'y',
  15: 'Y',
  16: 'W',
  17: 'w',
  18: 'A'
}

const generateShout = () => {
  const characterCount = Math.floor(Math.random() * 100 + 1)
  const max = Object.keys(possibleChars).length
  const shoutChunks = []
  for (let i = 0; i <= characterCount; i++) {
    const charIndex = Math.floor(Math.random() * max)
    shoutChunks.push(possibleChars[charIndex])
  }
  return shoutChunks.join('')
}

const shouts = {
  0: 'AH',
  1: 'AHHHHHHHHHHHHH',
  2: 'AAAAAHHHHHHHHHHHHHHAAAAAHHHHHH',
  3: 'FORA BOLSONARO AAAAAAAAAAHHHHH',
  4: 'eeeeAAAaaaAAAAAAAHHHHHHHHHHHHHHHHH',
  5: 'ah',
  6: 'aaAAAAAaAaaHHHHHHHHHHWWWWWWWWWWwwww',
  7: 'UAAAAaaahahaaaaawwww AAAAAaaaa AAAaAHHHHH',
  8: 'EEeeeewwwwwwwwwwww',
  9: 'WOOAAAAAAAaaaaAAAHHH AAAAAAHHHAHHHH OOOOAAAAHh',
  10: 'CARAIOOOOOOOOOOO AAAAAAA',
  11: 'OOOaaahhhhh',
  12: 'AAAAAAHHHHHHHHHHHHHH FUUUUUUUUUUCKKKK',
  13: 'AAaaaaAaaAAAAAAAOOOOoooOoooOOOHHHHHH',
  14: 'UUUUuuuuuuuAAAAAAAAHHHHHHH AAuuuHHH',
  15: 'AHHHH AHHH AHHH AHHHHHHHHHH',
  16: 'ooooOOOOOAAAaaAAAAAAAAAHHHHHHH',
  17: 'Hhhyyyaaaaaaaaaaaaayaaaaa aYYYAAAAAAA',
  18: 'Yoooaoaoaaaaaa AAAAAHHH',
  19: 'Eeaaaahhhh',
  20: 'AHHHHHHHHHH OUUAAAAAAHHHHHH',
  21: 'bolsonaro vai toma no cu fdp!!!!',
  22: generateShout()
}

const greenShouts = {
  0: 'Iiiiiiiiiiihhhhh cuzauummm',
  1: 'IIIIIIIIIHHHHHHHH VAI CAÍ MANO',
  2: 'olha a hora 👀',
  4: 'salve salve',
  5: 'kkkkkk kkkk kk kk kkkk',
  6: 'eita',
  9: 'i was gonna clean my room...',
  10: 'it\'s 4:20 my dudes'
}

module.exports = {
  shouts,
  greenShouts
}