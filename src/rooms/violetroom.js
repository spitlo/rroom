import android from '../characters/android'
import { onEnter, reevaluate } from '../utils'

/*

Violet: Vox. Humanoid? Notes C-D. "Spirit of the Fear of the Lord".

*/

const color = 'Violet'
const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
let pattern = ''
const synthParts = [
  'n("{0 1 3 5 0 12}%8 1").voicing().s("sine")',
  'arp("0 1 2 - 0 1 - 2").palindrome()',
  'vowel("[a|e|i|o|u]")',
  'velocity(".8 1")',
  'fm(5.5).fmh(2)',
  'lpf(rand.range(200,"<2000!5 4000>").slow(4)).lpq(8)',
  'delay(.4).room(0.3).gain(1).pan(0.6)',
]

let isAndroidRevealed = false
let chosenNotes = [] // 'A', 'C', 'F', 'G'

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const updatePattern = () => {
  pattern =
    chosenNotes.length > 0
      ? `chord("${chosenNotes.map((l, i) => `${l}${i % 2 === 0 ? 'm' : ''}`).join(' ')}")`
      : ''
}

const violetRoom = {
  id: 'violetroom',
  img: `V I O L E T _ R O O M`,
  name: `The ${color} Room`,
  desc: [
    // Don’t reveal the android until user looks at mannequin
    // "Looming"
    'You’re standing in the violet room. It’s completely bare, except for what looks like a metallic **mannequin** slumped against the back wall.',
    ...(disk && disk.visitedRooms.filter((r) => !'violetroom').length > 1
      ? [
          'This room seems deeper, longer than the others you visited, but the ceiling is much lower.',
          'The silence in here is imposing, it’s almost as if the room is holding its breath.',
          'As you start moving through the room, you notice that you’re unconsciously tiptoeing.',
          'You approach the mannequin with trepidation, slowly as to not disturb the oppressive tranquility.',
        ]
      : [
          'You don’t know how the other rooms look, but you hope they’re nothing like this one.',
          'The ceiling seems too low compared to the length of the room, and there’s something almost imposing about the silence in here – it’s as if the room is holding its breath.',
          'You approach the mannequin with trepidation, tiptoeing slowly as to not disturb the oppressive tranquility.',
        ]),
    'When you’re a few feet away from the mannequin, you feel something... a presence?',
    'No, your mind is just playing tricks on you. But still... you want to get out of this room.',
  ].join('\n'),
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    // const violetroom = getRoom('violetroom')
    // violetroom.img = ''

    onEnter('violetroom')
    // updatePattern()
    // reevaluate()
  },
  onLook: () => {
    violetRoom.desc = ''
    if (isAndroidRevealed) {
      println([].join('\n'))
    } else {
      println([].join('\n'))
    }
  },
  items: [
    {
      name: 'Mannequin',
      desc: [
        'You lean forward to examine the mannequin. As you reach out to touch it, it startles to life with an actuator scream.',
        '',
      ].join('\n'),
      onLook: () => {
        // Remove mannequin from inventory
        const mannequinIndex = disk.inventory
          .map((i) => i.name)
          .indexOf('Mannequin')
        violetRoom.items.splice(mannequinIndex, 1)
        // And add the andoid instead
        isAndroidRevealed = true
        android.roomId = 'violetroom'
      },
    },
  ],
  exits: [
    {
      dir: ['Rainbow Room', 'rainbowroom', 'exit', 'x'],
      id: 'rainbowroom',
    },
  ],
}

export default violetRoom
