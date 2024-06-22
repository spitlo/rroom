import { onEnter } from '../utils'

const DESCRIPTION = {
  initial: `You’re standing in an octagonal room. Seven of the walls hold a door, each in one of the colors of the rainbow.\n\nScrewed to the eight wall is some kind of **control panel**.`,
}

// The eight wall is almost completely covered by what looks like some kind of control panel.
// LEDs, meters, levers, buttons and sliders – some labeled, some not –

const rainbowRoom = {
  id: 'rainbowroom',
  img: `R A I N B O W _ R O O M`,
  name: 'The Rainbow Room',
  desc: DESCRIPTION.initial,
  onEnter: () => {
    // Only show image once
    const rainbowroom = getRoom('rainbowroom')
    rainbowroom.img = ''

    console.log('Entering rainbow room') /* eslint-disable-line */

    if (disk.isPlaying) {
      // For now
      onEnter()
    }
  },
  onLook: () => {
    const rainbowroom = getRoom('rainbowroom')
    rainbowroom.desc = ''

    println(DESCRIPTION.initial)
  },
  items: [
    {
      name: ['control panel', 'panel'],
      desc: 'It’s some kind of control panel, with two huge buttons. One says ’**PLAY**’, the other one ’**STOP**’.',
      onLook: () =>
        println(disk.isPlaying ? 'The PLAY button is pulsating slowly.' : ''),
    },
  ],
  exits: [
    {
      dir: ['Red Door', 'red', 'r'],
      id: 'redroom',
    },
    {
      dir: ['Orange Room', 'orange', 'o'],
      id: 'orangeroom',
    },
    {
      dir: ['Yellow Room', 'yellow', 'y'],
      id: 'yellowroom',
    },
    {
      dir: ['Green Room', 'green', 'g'],
      id: 'greenroom',
    },
    {
      dir: ['Blue Room', 'blue', 'b'],
      id: 'blueroom',
    },
    {
      dir: ['Indigo Room', 'indigo', 'i'],
      id: 'indigoroom',
    },
    {
      dir: ['Violet Room', 'violet', 'v'],
      id: 'violetroom',
    },
  ],
}

export default rainbowRoom
