import { onEnter } from '../utils'
/*

Trigram: Heaven, the Creative, light, and warmth.
---
---
---

*/

const DESCRIPTION = {
  intro: [
    'Welcome to the Rainbow Room',
    'This is an experiment in generative, semi-random sequencing – hidden inside an Interactive Fiction story.',
    'If this is your first time, type HELP to see the commands that are available to you.',
    'BEWARE - This is a work in progress and very much ib beta still - BEWARE',
  ].join('\n'),
  standard: [
    'You’re standing in an octagonal room. Seven of the walls hold a door, each in one of the colors of the rainbow.',
    'The eighth wall is almost completely covered by what looks like a **control panel** from some obscure fifties’ sci-fi movie: futuristic, but in an old-fashioned way.',
    'LEDs, meters, levers, buttons and sliders – some labeled, some not – take up most of the real estate of the panel.',
  ].join('\n'),
}

const describeLeds = () => {
  const activeRooms = disk.rooms
    .filter((room) => room.isActive)
    .map((room) => room.color)

  if (activeRooms.length === 0) {
    println('None of the LEDs are lit.')
  } else if (activeRooms.length === 1) {
    println(`The ${activeRooms[0]} LED is lit.`)
  } else {
    let first = ''
    for (let i = 0; i < activeRooms.length - 1; i++) {
      first += `${activeRooms[i]}, `
    }
    println(
      `The ${first.slice(0, -2)} and ${activeRooms[activeRooms.length - 1]} LEDs are lit.`
    )
  }
}

const describeMutes = () => {
  const mutedRooms = disk.rooms
    .filter((room) => room.isMuted)
    .map((room) => room.color)

  if (mutedRooms.length === 0) {
    println('None of the rooms seem muted.')
  } else if (mutedRooms.length === 1) {
    println(`The ${mutedRooms[0]} room is muted.`)
  } else {
    let first = ''
    for (let i = 0; i < mutedRooms.length - 1; i++) {
      first += `${mutedRooms[i]}, `
    }
    println(
      `The ${first.slice(0, -2)} and ${mutedRooms[mutedRooms.length - 1]} rooms appear to be muted.`
    )
  }
}

const rainbowRoom = {
  id: 'rainbowroom',
  img: ['■■■■■■■■■', '■■■■■■■■■', '■■■■■■■■■'].join('\n'),
  name: 'The Rainbow Room BETA',
  desc: `${DESCRIPTION.intro}\n- - - - - - - - - - - - - - - - - - - -\n${DESCRIPTION.standard}`,
  onEnter: () => {
    // Only show image once
    const rainbowroom = getRoom('rainbowroom')
    rainbowroom.img = ''

    onEnter()
  },
  onLook: () => {
    rainbowRoom.desc = DESCRIPTION.standard
  },
  items: [
    {
      name: ['control panel', 'panel'],
      desc: [
        'It’s some kind of control panel. In the center of it there are two huge buttons. One says ’**PLAY**’, the other one ’**STOP**’.',
        'A row of LEDs run across the top of the panel. There are seven of them. Their colors correspond to the colors of the doors.',
        'And, coincidentally, to the colors of the rainbow.',
        'Underneath each LED is a switch labeled "Mute".',
      ].join('\n'),
      onLook: () => {
        if (disk.isPlaying) {
          println('The PLAY button is pulsating slowly.')
        }
        describeLeds()
        describeMutes()
      },
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
