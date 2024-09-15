import { getRandomInt, onEnter, reevaluate } from '../utils'

/*

Yellow: Envy? Gambling?  Notes F-G. "Spirit of Understanding".
Day: Monday
Trigram: Wind, the Gentle (Wood), the movement of air.
---
---
- -

TODO: Contraption should be some kind of flute I guess?
Also, should the handle of the lever be unscrewable and possible to use in another room?

*/

const color = 'Yellow'
const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
let pattern = ''
const synthParts = [
  'sound("[triangle]").fm(1.4)',
  'layer(x=>x.s("sawtooth").vib(4),x=>x.s("square").add(note(12)))',
  'lpf(800).lpq(6).dec(1.5)',
  'vib("8:.5").gain(.8)',
  'djf("<.5 .25 .5 .75>")',
  'leslie("<0 .3 1 .8>")',
  'velocity(sine.range(.2, .3).slow(15))',
  'slow(2)',
]

const adverbs = [
  'intently',
  'with determination',
  'slowly',
  'carefully',
  'wistfully',
]
const contraptionSounds = [
  'There’s a muffled mechanical rumble from the machine, like you have awakened some ancient robotic creature.',
  'There’s a weird, metallic rumble, then the klak-klak-klak of a ratchet winding, then a loud PLONK! and a pause.',
  'At first nothing happens. Then you hear a hollow PA-DONK! and what sounds like rusty gears spinning.',
]
const cubeDescents = [
  'It tumbles down a tube, bounces off a metal pin, down another tube, then balances briefly on a tiny ledge before it proceeds downward.',
  'It rolls down a tube, takes a sudden turn as it hits a bumper, hangs in the air for a while as if being carried by a jet of air, then continues its descent.',
  'It slides down a tube and lands on a small moving conveyor belt where it sits for a while until it’s struck lightly by a wooden mallet. This interaction causes it to continue its descent through the bowels of the contraption.',
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

const discoverCubes = () => {
  // Only add cubes once
  if (yellowRoom && yellowRoom.items.length < 4) {
    for (const letter of notes) {
      yellowRoom.items.push({
        name: [`Cube${letter}`],
        desc: `A cube with the letter **${letter}**`,
        onUse: () => {
          if (usedCubes.includes(letter)) {
            println('This cube is already in the contraption.')
          } else if (length.emptySlots === 0) {
            println(
              'None of the slots are empty. The cube falls down the funnel, bounces off the filled slots, falls through the contraption and rolls out in the bucket again.'
            )
          } else {
            let slot = getRandomInt(0, 4)
            if (!emptySlots.includes(slot)) {
              println(
                [
                  `You drop the cube labeled "${letter}" into the funnel.`,
                  `It really wants to land in slot ${slot + 1}, but the slot is occupied and the cube falls through and lands back in the bucket.`,
                ].join('\n')
              )
            } else {
              println(
                [
                  `You drop the cube labeled "${letter}" into the funnel.`,
                  pickOne(cubeDescents),
                  `It finally lands in the slot numbered ${slot + 1}`,
                ].join('\n')
              )
              yellowRoom.isActive = true
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
  }
}

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const updatePattern = () => {
  pattern =
    slots.length > 0
      ? `note("${slots.map((l) => `${l}${l === '-' ? '' : octave}`).join(' ')}")`
      : ''
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

const yellowRoom = {
  id: 'yellowroom',
  img: ['■■■■■■■■■', '■■■■■■■■■', '■■■■ ■■■■'].join('\n'),
  name: `The ${color} Room`,
  desc: [
    'This is the yellow room. The first thing in it that catches your attention is a weird **contraption**, smack in the middle of the room.',
    'On the floor beneath the contraption is a **bucket** filled with what looks like wooden alphabet cubes.',
    'Behind the contraption, a befuddling network of intertwining wooden pipes extend upward, some of them almost reaching the ceiling.',
  ].join('\n'),
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  onEnter: () => {
    onEnter('yellowroom')
  },
  items: [
    {
      name: ['Contraption'],
      desc: [
        'Apart from all the wiring, the ornamentation and the weird details, the contraption seems fairly simple.',
        'There are five square slots behind a glass pane.',
        'The slots are about the same size as the alphabet cubes in the bucket at the bottom of the contraption.',
        'On top of the contraption is a large funnel. On the side of it is a **lever**.',
      ].join('\n'),
    },
    {
      name: ['Lever'],
      desc: [
        'There’s a lever affixed to the right side of the contraption.',
        'It makes it look like one of those old slot machines that people used to call "One-armed bandits".',
      ].join('\n'),
      onUse: () => {
        println(`You pull the lever ${pickOne(adverbs)}.`)
        if (usedCubes.length === 0) {
          // No cubes are used, do nothing
          println('The contraption makes a small racket, but nothing happens.')
        } else {
          // Cubes are in use, reset contraption
          let sing = usedCubes.length === 1 ? 's' : ''
          println(
            [
              pickOne(contraptionSounds),
              `After a moment, the slots open up and ${sing ? `the cube labeled ${usedCubes[0]}` : 'all the cubes'} fall${sing} through, tumble${sing} down a tube and land${sing} in the bucket.`,
            ].join('\n')
          )
          resetContraption()
          updatePattern()
          reevaluate()
        }
      },
    },
    {
      name: ['Bucket', 'Cubes'],
      desc: [
        'There are seven wooden cubes in the bucket. On each side of each cube, a letter is painted. One letter for each of the sevens cubes: A to G.',
        'The cubes are about the same size as the square slots in the contraption.',
        'It appears you can use them in some way.',
      ].join('\n'),
      onUse: () => {
        if (!slots.includes('-')) {
          println(
            'All slots are already filled, and the cubes bounce off them and tumble down the innards of the contraption, eventually ending up back in the bucket.'
          )
        } else {
          println(
            'You empty the bucket in the funnel. The cubes tumble down a tube. Some of them land in a slot, others continue through the contraption and end up back in the bucket.'
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
          yellowRoom.isActive = true
          discoverCubes()
          updatePattern()
          reevaluate()
          describeSlots()
        }
      },
      onLook: () => {
        discoverCubes()
      },
    },
  ],
  exits: [
    {
      dir: ['Rainbow Room', 'rainbowroom', 'exit', 'se', 'x'],
      id: 'rainbowroom',
    },
  ],
}

export default yellowRoom
