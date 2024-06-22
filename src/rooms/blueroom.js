import { onEnter, getRandomInt, reevaluate } from '../utils'

const color = 'Blue'
const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
let pattern = ''
const synthParts = [
  'sound("[triangle]").fm(1.4)',
  'lpf(800).lpq(6).dec(1.5)',
  'vib("7:.3").gain(.8)',
  'velocity(sine.range(.2, .3).slow(15))',
]

let emptySlots
let usedCubes
let slots
let octave

const resetContraption = () => {
  emptySlots = [0, 1, 2, 3, 4]
  usedCubes = []
  slots = ['-', '-', '-', '-', '-']
  octave = 4
}

resetContraption()

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const updatePattern = () => {
  pattern = `note("${slots.map((l) => `${l}${l === '-' ? '' : octave}`).join(' ')}")`
}

const describeSlots = () => {
  if (slots.length === 0) {
    println('No slots have cubes in them.')
  } else {
    const lines = []
    for (let i = 0; i < slots.length; i++) {
      if (slots[i] !== '-') {
        lines.push(
          `In slot number ${i + 1} there is a cube with the letter ${slots[i]}`
        )
      }
    }
    println(lines.join('\n'))
  }
}

const blueRoom = {
  id: 'blueroom',
  img: `B L U E _ R O O M`,
  name: `The ${color} Room`,
  desc: `This is the blue room. In the middle of the room there is a weird **contraption**. On the floor beneath the contraption is a **bucket** with what looks like wooden alphabet cubes.`,
  active: false,
  muted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    const blueroom = getRoom('blueroom')
    blueroom.img = ''

    console.log('Entering blue room') /* eslint-disable-line */

    onEnter()
  },
  onLook: () => {
    const blueroom = getRoom('blueroom')
    blueroom.desc = ''
  },
  items: [
    {
      name: ['contraption'],
      desc: [
        'Apart from all the wiring, the ornamentation and the weird details, the contraption seems fairly simple.',
        'There are five square slots behind a glass pane.',
        'The slots are about the same size as the alphabet cubes in the bucket at the bottom of the contraption.',
        'On top of the contraption is a large funnel.',
      ].join('\n'),
    },
    {
      name: ['bucket', 'cubes'],
      desc: [
        'There are seven wooden cubes in the bucket. On each side of each cube, a letter is painted – one letter for each cube.',
        'The cubes are about the same size as the square slots in the contraption.',
      ].join('\n'),
      onUse: () => {
        if (!slots.includes('-')) {
          println(
            'All slots are already filled, and the cubes bounce off them and tumble down the innards of the contraption, eventually ending up back in the bucket.'
          )
        } else {
          println(
            'You empty the bucket in the funnel. They tumble down a tube, and – one by one – land in a slot.'
          )
          while (slots.includes('-')) {
            const letter = pickOne(notes)
            if (!usedCubes.includes(letter)) {
              usedCubes.push(letter)
              const slot = pickOne(emptySlots)
              emptySlots.splice(emptySlots.indexOf(slot), 1)
              slots[slot] = letter
            }
          }
          updatePattern()
          reevaluate()
          describeSlots()
        }
      },
      onLook: () => {
        for (const letter of notes) {
          blueRoom.items.push({
            name: [`Cube${letter}`, letter, letter.toLowerCase()],
            desc: `A cube with the letter **${letter}**`,
            onUse: () => {
              if (usedCubes.includes(letter)) {
                println('This cube is already in the contraption.')
              } else if (length.emptySlots === 0) {
                println(
                  'The cube falls down the funnel, bounces off the filled slots, falls through the contraption and rolls out in the ucket again.'
                )
              } else {
                let slot = getRandomInt(0, 4)
                if (!emptySlots.includes(slot)) {
                  println(
                    [
                      `You put the cube with the letter ${letter} in the funnel.`,
                      `It really wants to land in slot ${slot + 1}, but the slot is occupied and the cube falls through and lands in the bucket again.`,
                    ].join('\n')
                  )
                } else {
                  println(
                    [
                      `You put the cube with the letter ${letter} in the funnel.`,
                      `It tumbles down a tube and lands in the slot numbered ${slot + 1}`,
                    ].join('\n')
                  )
                  usedCubes.push(letter)
                  emptySlots.splice(emptySlots.indexOf(slot), 1)
                  slots[slot] = letter
                  updatePattern()
                  reevaluate()
                  describeSlots()
                }
              }
            },
          })
        }
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

export default blueRoom
