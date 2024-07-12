import { onEnter, reevaluate } from '../utils'

/*

Red: Siren?, blood? Notes D-E. F according to Scriabin. "Spirit of the Lord".
Day: Sunday
Trigram: Earth, the Receptive, dark, and cold.
- -
- -
- -


*/

const color = 'Red'
let pattern = ''
const synthParts = []

let octave = 2

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const updatePattern = () => {
  pattern = `note("${openValves.map((l) => `${l}${octave}`).join(' ')}")`
}

const redRoom = {
  id: 'redroom',
  img: ['■■■■ ■■■■', '■■■■ ■■■■', '■■■■ ■■■■'].join('\n'),
  name: `The ${color} Room`,
  desc: `This is the red room`,
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    // const redroom = getRoom('redroom')
    // redroom.img = ''

    onEnter('redroom')
  },
  items: [],
  exits: [
    {
      dir: ['Rainbow Room', 'rainbowroom', 'exit', 'ne', 'x'],
      id: 'rainbowroom',
    },
  ],
}

export default redRoom
