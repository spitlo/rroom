import { onEnter, reevaluate } from '../utils'

/*

Indigo: Electricity? Notes B-C. "Spirit of Knowledge".

*/

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
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    // const indigoroom = getRoom('indigoroom')
    // indigoroom.img = ''

    onEnter('indigoroom')
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
