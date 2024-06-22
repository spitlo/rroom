import { onEnter } from '../utils'

const color = 'Yellow'
let pattern = ''
const synthParts = []

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const yellowRoom = {
  id: 'yellowroom',
  img: `Y E L L O W _ R O O M`,
  name: `The ${color} Room`,
  desc: `This is the yellow room`,
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    const yellowroom = getRoom('yellowroom')
    yellowroom.img = ''

    console.log('Entering violet room') /* eslint-disable-line */

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

export default yellowRoom
