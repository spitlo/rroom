import { getRandomInt, onEnter, reevaluate } from '../utils'

/*

Blue: Water. Bass. Notes A-B. "Spirit of Might".

Manual: Valves.
Random: Automatic valves.

Perhaps we make it as a lminar flow/jumping fountain? But to get the water to jump long enough to reach the receptacle, the
water pressure must be high enough. Perhaps there is a water pump connected to a hamster wheel?

*/

const color = 'Blue'
const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
let pattern = ''
const synthParts = [
  'slow(2).sound("sine")',
  'vib(sine.segment(16).range(0.01,0.5).range(0.1,1))',
  'fm(3).gain(0.2).room(0.5)',
]

let octave = 1
let openValves = []
let isWaterPressureFixed = false
let wheelTurner

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const updatePattern = () => {
  pattern =
    openValves.length > 0
      ? `note("${openValves.map((l) => `${l}${octave}`).join(' ')}")`
      : ''
}

const describeValves = () => {
  if (openValves.length === 0) {
    println('No valves are open.')
  } else if (openValves.length === 1) {
    println(`Valve ${openValves[0]} is open.`)
    if (isWaterPressureFixed) {
      println(
        `A single stream of water shoots out of the nozzle labeled ${openValves[0]} and flies across the room. When it lands, a single bass note is played.`
      )
    } else {
      println(
        [
          `A single stream of water shoots out of the nozzle labeled ${openValves[0]} and lands with a splash on the floor halfway across the room.`,
          'Perhaps the water pressure is not enough?',
        ].join('\n')
      )
    }
  } else {
    let first = ''
    for (let i = 0; i < openValves.length - 1; i++) {
      first += `${openValves[i]}, `
    }
    println(
      `Valves ${first.slice(0, -2)} and ${openValves[openValves.length - 1]} are open.`
    )
    if (isWaterPressureFixed) {
      println(
        `Streams of water shoot out of the nozzles and fly across the room. As each land, a single bass note is played.`
      )
    } else {
      println(
        [
          `Streams of water shoot out of the nozzles and land with a splash on the floor halfway across the room.`,
          'Perhaps the water pressure is not enough?',
        ].join('\n')
      )
    }
  }
}

const enableWheelTurn = () => {
  console.log('Enabling wheel turn') /* eslint-disable-line */
  isWaterPressureFixed = true
  blueRoom.isActive = true
  updatePattern()
  reevaluate()
}

const disableWheelTurn = () => {
  console.log('Disabling wheel turn') /* eslint-disable-line */
  println(
    [
      'As the wheel slows, the water pressure goes down again.',
      'The earth-shattering bass that moments ago filled the room dies down and dissipates as if absorbed by the cracks in the floor.',
      'You would have to turn this wheel indefinately to get a bass line going.',
      'Or get someone to do it for you.',
    ].join('\n')
  )
  isWaterPressureFixed = false
  pattern = 'note()'
  reevaluate()
  blueRoom.isActive = false
}

const valves = notes.map((letter) => {
  return {
    name: `Valve${letter}`,
    desc: `A valve with the letter ${letter}`,
    onUse: () => {
      if (openValves.includes(letter)) {
        openValves.splice(openValves.indexOf(letter), 1)
      } else {
        openValves.push(letter)
      }

      if (!disk.isPlaying) {
        println('Nothing happens.')
        return
      }

      if (isWaterPressureFixed) {
        // This room is now active
        blueRoom.isActive = true

        // Update pattern, then update Strudel
        updatePattern()
        reevaluate()
      }

      // Tell user what valves are depressed
      describeValves()
    },
  }
})

const blueRoom = {
  id: 'blueroom',
  img: `B L U E _ R O O M`,
  name: `The ${color} Room`,
  desc: [
    'The room is dark. The only light – blue, pulsating – emanates from the translucent pipes running up and down the walls.',
    'The pipes seem to converge in a row of seven nozzles, pointed at a slightly upwards angle.',
    'Above the nozzles are seven valves, labeled A to G.',
  ].join('\n'),
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  enableWheelTurn,
  onEnter: () => {
    // Only show image once
    // const blueroom = getRoom('blueroom')
    // blueroom.img = ''

    onEnter('blueroom')
  },
  items: [
    ...valves,
    {
      name: ['wheel'],
      desc: '',
      onUse: () => {
        if (openValves.length === 0) {
          println(`The water presssure rises, but nothing happens`)
        } else if (openValves.length === 1) {
          println(
            [
              `The water pressure rises. A single jet of water shoots out from the nozzle labeled ${openValves[0]}, fly across the room and lan in its corresponding receptacle.`,
              `As it lands, a profound bass note shakes the room.`,
            ].join('\n')
          )
        } else {
          println(
            [
              `The water pressure rises. Water shoots out from the nozzles with open valves, fly across the room and lan in their respective receptacle.`,
              `As each jet of water lands, a profound bass note shakes the room.`,
            ].join('\n')
          )
        }
        enableWheelTurn()
        setTimeout(disableWheelTurn, 5000)
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
