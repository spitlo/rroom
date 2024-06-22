import { onEnter } from '../utils'

const color = 'Red'
let pattern = ''
const synthParts = []

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const redRoom = {
  id: 'redroom',
  img: `R E D _ R O O M`,
  name: `The ${color} Room`,
  desc: `This is the red room`,
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    const redroom = getRoom('redroom')
    redroom.img = ''

    console.log('Entering red room') /* eslint-disable-line */

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

export default redRoom
