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
    'You’re standing in the middle of an octagonal room. Seven of the walls surrounding you hold a door; each door is one of the colors of the rainbow.',
    'From left to right, you have a **Red Door** to the south west. To the west is an **Orange Door**. Next is a **Yellow Door** to the nort west. Due north is a **Green Door**, and next to it, to the north east, is a **Blue Door**. Due east is an **Indigo Door**, and to the south east is a **Violet Door**.',
    'To the south, the eighth wall is almost completely covered by what looks like a **control panel** from some obscure fifties’ sci-fi movie: futuristic, but in an old-fashioned way.',
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
      dir: ['Red Door', 'red', 'r', 'sw'],
      id: 'redroom',
      block:
        'The red door appears to be locked. What are they keeping from you?',
    },
    {
      dir: ['Orange Door', 'orange', 'o', 'w'],
      id: 'orangeroom',
      block: 'Something seems to be blocking this door. But what?',
    },
    {
      dir: ['Yellow Door', 'yellow', 'y', 'nw'],
      id: 'yellowroom',
    },
    {
      dir: ['Green Door', 'green', 'g', 'n'],
      id: 'greenroom',
    },
    {
      dir: ['Blue Door', 'blue', 'b', 'ne'],
      id: 'blueroom',
    },
    {
      dir: ['Indigo Door', 'indigo', 'i', 'e'],
      id: 'indigoroom',
      block:
        'No matter how hard you pull, the door won’t budge. You can’t help but wonder what might be hidden behind it.',
    },
    {
      dir: ['Violet Door', 'violet', 'v', 'se'],
      id: 'violetroom',
    },
  ],
}

export default rainbowRoom
