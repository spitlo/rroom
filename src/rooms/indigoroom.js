import { onEnter } from '../utils'

const color = 'Indigo'
let pattern = ''
const synthParts = []

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const indigoRoom = {
  id: 'indigoroom',
  img: `I N D I G O _ R O O M`,
  name: `The ${color} Room`,
  desc: `This is the indigo room`,
  active: false,
  muted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    const indigoroom = getRoom('indigoroom')
    indigoroom.img = ''

    console.log('Entering indigo room') /* eslint-disable-line */

    onEnter()
  },
  onLook: () => {
    const indigoroom = getRoom('indigoroom')
    indigoroom.desc = ''
  },
  items: [],
  exits: [
    {
      dir: ['Rainbow Room', 'rainbowroom', 'exit', 'x'],
      id: 'rainbowroom',
    },
  ],
}

export default indigoRoom
