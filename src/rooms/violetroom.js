import android from '../characters/android'
import { onEnter, reevaluate } from '../utils'

/*

Violet: Vox. Humanoid? Notes C-D. "Spirit of the Fear of the Lord".
Day: Tuesday
Trigram: Thunder, the Arousing, the voice of heaven.
- -
- -
---

Inspiration:
Voder https://en.wikipedia.org/wiki/Voder
Euphonia https://en.wikipedia.org/wiki/Euphonia_(device)
Maschinenmensch https://en.wikipedia.org/wiki/Maschinenmensch

https://strudel.cc/#bm90ZSgiW2MyIDxhMiA8ZzIgZDE%2BPl0qMiIpLnMoIjxzYXd0b290aCBzcXVhcmU%2BIikKLnZvd2VsKCI8YSBlIGkgeSA8byB1ZT4%2BIikKLnZpYig0KQoudmlibW9kKCI8LjI1IDUgMSAuMiAxMj4iKQoucGhhc2VyKDIpLnBoYXNlcnN3ZWVwKCI8ODAwIDIwMDAgNDAwMD4iKQouY3V0b2ZmKHBlcmxpbi5yYW5nZSg1MDAsODAwMCkpCi5sYXllcih4PT54LmFkZCgiMCw2IikpCg%3D%3D
https://strudel.cc/#bm90ZSgiW2MyIDxhMiA8ZzIgZDE%2BPl0qMiIpLnMod2Nob29zZShbInNhd3Rvb3RoIiw1XSwgWyJzcXVhcmUiLDJdKSkgLy8gLnMoIjxzYXd0b290aCBzcXVhcmU%2BIikKLnZvd2VsKCI8YSBlIGkgeSA8byB1ZT4%2BIikKLnZpYig0KQoudmlibW9kKCI8LjI1IDUgMSAuMiAxMj4iKQoucGhhc2VyKDIpLnBoYXNlcnN3ZWVwKCI8ODAwIDIwMDAgNDAwMD4iKQouY3V0b2ZmKHBlcmxpbi5yYW5nZSg1MDAsODAwMCkpCi5sYXllcih4PT54LmFkZCgiMCw2IikpCg%3D%3D
https://strudel.cc/#Ly9ub3RlKCJbYzIgPGEyIDxnMiBkMT4%2BXSoyIikKbm90ZSgiQSBDIDxHIEU%2BIikKLmV1Y2xpZExlZ2F0bygzLDgpCi5zKHdjaG9vc2UoWyJzYXd0b290aCIsNV0sIFsic3F1YXJlIiwyXSkpIC8vIC5zKCI8c2F3dG9vdGggc3F1YXJlPiIpCi52b3dlbCgiPGEgZSBpIHkgPG8gdWU%2BPiIpCi52aWIoNCkKLnZpYm1vZCgiPC4yNSA1IDEgLjIgMTI%2BIikKLnBoYXNlcigyKS5waGFzZXJzd2VlcCgiPDgwMCAyMDAwIDQwMDA%2BIikKLmN1dG9mZihwZXJsaW4ucmFuZ2UoNTAwLDgwMDApKQoubGF5ZXIoeD0%2BeC5hZGQoIjAsNiIpKQo%3D

*/

const color = 'Violet'
const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
let pattern = ''
let lpq = 8
let fm = 5.5
let fmh = 2
const synthParts = [
  'n("{0 1 3 5 0 12}%8 1").voicing().s("sine")',
  'arp("0 1 2 - 0 1 - 2").palindrome()',
  'vowel("[a|e|i|o|u]")',
  'velocity(".8 1")',
  () => `fm(${fm}).fmh(${fmh})`,
  () => `lpf(rand.range(200,"<2000!5 4000>").slow(4)).lpq(${lpq})`,
  'delay(.4).room(0.3).gain(1).pan(0.6)',
]

let isAndroidRevealed = false
let chosenNotes = [] // 'A', 'C', 'F', 'G'

const generateSoundString = () => {
  if (pattern) {
    let synth = ''
    for (const synthPart of synthParts) {
      if (typeof synthPart === 'function') {
        synth = `${synth}.${synthPart()}`
      } else {
        synth = `${synth}.${synthPart}`
      }
    }
    return `${pattern}${synth}`
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
  img: ['■■■■ ■■■■', '■■■■■■■■■', '■■■■ ■■■■'].join('\n'),
  name: `The ${color} Room`,
  desc: [
    // Don’t reveal the android until user looks at mannequin
    // "Looming"
    'You’re standing in the violet room. It’s completely bare, except for what looks like an undressed **mannequin** slumped against the back wall.',
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
  },
  onLook: () => {
    violetRoom.desc = ''
    const desc = [
      'The violet room is long and bare. The ceiling seems too low, and it’s making you hunch forward unconsciously.',
    ]
    if (isAndroidRevealed) {
      desc.push(
        'There’s an android here, staring at you. It’s creeping you out.'
      )
    } else {
      desc.push(
        'There’s a mannequin here, slumped against the wall. It’s creeping you out.'
      )
    }
    println(desc.join('\n'))
  },
  items: [
    {
      name: 'Mannequin',
      desc: [
        'You lean forward to examine the mannequin. As you reach out to touch it, it startles to life with an actuator scream.',
        'Holy fuck, this is not a mannequin. This is a real life android.',
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
      dir: ['Rainbow Room', 'rainbowroom', 'exit', 'nw', 'x'],
      id: 'rainbowroom',
    },
  ],
}

export default violetRoom
