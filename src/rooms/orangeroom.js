import { onEnter, reevaluate } from '../utils'

/*

Orange: Organ, fire. Matches needded? Notes E-F. "Spirit of Wisdom".
Trigram: Fire, the Clinging, the consuming energy, breaking free and departing.
---
- -
---

*/

const color = 'Orange'
let pattern = ''
const synthParts = []

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const orangeRoom = {
  id: 'orangeroom',
  img: ['■■■■■■■■■', '■■■■ ■■■■', '■■■■■■■■■'].join('\n'),
  name: `The ${color} Room`,
  desc: `This is the orange room`,
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    // const orangeroom = getRoom('orangeroom')
    // orangeroom.img = ''

    onEnter('orangeroom')
  },
  items: [],
  exits: [
    {
      dir: ['Rainbow Room', 'rainbowroom', 'exit', 'e', 'x'],
      id: 'rainbowroom',
    },
  ],
}

export default orangeRoom
