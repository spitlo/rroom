import { onEnter } from '../utils'

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
  img: `O R A N G E _ R O O M`,
  name: `The ${color} Room`,
  desc: `This is the orange room`,
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    const orangeroom = getRoom('orangeroom')
    orangeroom.img = ''

    console.log('Entering orange room') /* eslint-disable-line */

    onEnter()
  },
  items: [],
  exits: [
    {
      dir: ['Rainbow Room', 'rainbowroom', 'exit', 'x'],
      id: 'rainbowroom',
    },
  ],
}

export default orangeRoom
