import { onEnter } from '../utils'

const color = 'Violet'
let pattern = ''
const synthParts = []

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const violetRoom = {
  id: 'violetroom',
  img: `V I O L E T _ R O O M`,
  name: `The ${color} Room`,
  desc: `This is the violet room`,
  active: false,
  muted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    const violetroom = getRoom('violetroom')
    violetroom.img = ''

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

export default violetRoom
