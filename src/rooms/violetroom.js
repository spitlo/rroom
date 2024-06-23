import { onEnter, reevaluate } from '../utils'

/*

Violet: Vox. Humanoid? Notes C-D. "Spirit of the Fear of the Lord".

*/

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
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    const violetroom = getRoom('violetroom')
    violetroom.img = ''

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
