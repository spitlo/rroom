import { onEnter, reevaluate } from '../utils'

/*

Green: Vegetation, lizard. Notes G-A. "Spirit of Counsel".

*/

const color = 'Green'
const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
let pattern = ''
const synthParts = [
  'segment(4).clip(rand.range(.4,.8))',
  'room(.35).delay(.15)',
  'fm(sine.range(2,6).slow(8))',
  'lpf(sine.range(600,1200).slow(6)).lpq(3)',
  'rarely(ply("2")).chunk(4, fast(2))',
]

let buttons = []
let octave = 3
let isLizardFree = false
let lizardWalker
let askedAboutCage = 0

const generateSoundString = () => {
  if (pattern) {
    return `${pattern}.${synthParts.join('.')}`
  } else {
    return ''
  }
}

const updatePattern = () => {
  pattern =
    buttons.length > 0
      ? `note("${buttons.map((l) => `${l}${octave}`).join(' ')}")`
      : ''
}

const describeButtons = () => {
  if (buttons.length === 0) {
    println('No buttons are depressed.')
  } else if (buttons.length === 1) {
    println(`Button ${buttons[0]} is depressed.`)
  } else {
    let first = ''
    for (let i = 0; i < buttons.length - 1; i++) {
      first += `${buttons[i]}, `
    }
    println(
      `Buttons ${first.slice(0, -2)} and ${buttons[buttons.length - 1]} are depressed.`
    )
  }
}

const enableLizardWalk = () => {
  lizardWalker = setInterval(() => {
    // Randomize buttons
    const newButtons = []
    notes.forEach((note) => {
      if (Math.random() < 0.2) {
        newButtons.push(note)
      }
    })
    buttons = [...newButtons]
    if (buttons.length === 0) {
      // No note selected. Fall back to E because, well, according to
      // "Mundi Consensum ex Harmonia Musica explicat et Praelectiones
      // Suas Philosophicas et Mathematicas Intimat" by David Gottlob Diez,
      // Green is E.
      buttons.push('E')
    }
    updatePattern()
    reevaluate()
  }, 3000)
}

const disableLizardWalk = () => {
  clearInterval(lizardWalker)
  isLizardFree = false
}

const buttonItems = notes.map((letter) => {
  return {
    name: `Button${letter}`,
    desc: `A button with the letter ${letter}`,
    onUse: () => {
      if (buttons.includes(letter)) {
        buttons.splice(buttons.indexOf(letter), 1)
      } else {
        buttons.push(letter)
      }

      if (!disk.isPlaying) {
        println('Nothing happens.')
      }

      // This room is now active
      greenRoom.isActive = true

      // Update pattern, then update Strudel
      updatePattern()
      reevaluate()

      // Tell user what buttons are depressed
      describeButtons()
    },
  }
})

const greenRoom = {
  id: 'greenroom',
  img: `G R E E N _ R O O M`,
  name: `The ${color} Room`,
  desc: [
    'This is a very green room. You can’t really see the walls – they’re all covered in leaves and vines.',
    'It’s incredibly humid in here.',
    'In the far corner of the room, some kind of ancient stone machinery is withering away, halv covered in vegetation.',
    'You can see **buttons** on it, and something that looks like a **lever**.',
    'There is a **cage** on the floor.',
  ].join('\n'),
  isActive: false,
  isMuted: false,
  color,
  generateSoundString,
  onEnter: () => {
    // Only show image once
    // const greenroom = getRoom('greenroom')
    // greenroom.img = ''

    onEnter('greenroom')
  },
  items: [
    ...buttonItems,
    {
      name: 'Buttons',
      desc: 'There are seven buttons. Above each, a letter is chiseled. It’s the first seven letters of the alphabet.',
      onUse: () => {
        println(
          'You can’t use all the buttons at once. Try using one of the buttons instead. For example **ButtonA**.'
        )
      },
      onLook: () => {
        if (isLizardFree) {
          println(
            'A very happy lizard is skipping across the buttons, engaging and disengaging them in a seemingly random pattern.'
          )
        } else {
          describeButtons()
        }
      },
    },
    {
      name: 'Lever',
      desc: 'The lever has two positions, marked "2" and "3".',
      onLook: () => {
        println(`It’s currently in the "${octave}" position.`)
      },
      onUse: () => {
        octave = octave === 2 ? 3 : 2

        println(`The lever is now in the "${octave}" position.`)
        if (!disk.isPlaying) {
          println('Nothing happens.')
        } else {
          println(
            'This seems to have changed the octave of the notes playing. Sweet!'
          )
        }

        // Update pattern, then update Strudel
        updatePattern()
        reevaluate()
      },
    },
    {
      name: 'Cage',
      desc: 'There’s a small golden cage on the floor',
      onLook: () => {
        if (isLizardFree) {
          println('The cage is empty.')
        } else {
          println(
            [
              'From inside, a lizard peers curiously at you.',
              'The lizard is not huge, but way too big for the small cage.',
              'The cage has a door, and it seems to be bolted, not locked.',
            ].join('\n')
          )
        }
      },
      onTake: () => {
        println(
          'The cage is fastened to the stone floor with huge clasps. You won’t be able to move it. Perhaps you can use it some other way?'
        )
      },
      onUse: () => {
        if (askedAboutCage === 0) {
          println(
            'Do you really want to open the cage door? The lizard will get out.'
          )
          askedAboutCage++
        } else if (askedAboutCage === 1) {
          println(
            'I mean, it’s your choice, and the lizard does seem pretty friendly. Are you absolutely sure?'
          )
          askedAboutCage++
        } else {
          println(
            [
              'You wiggled the bolt a bit, and after a few tries you manage to slide it open.',
              'You open the cage door and the lizard immediately slips out.',
              'After looking around the room, it heads for the stone machine and starts walking proudly across the buttons.',
            ].join('\n')
          )
          enableLizardWalk()
          isLizardFree = true
          greenRoom.isActive = true
          greenRoom.items.push({
            name: 'Lizard',
            desc: 'A green lizard.',
            isTakeable: true,
            onTake: () => {
              println(
                [
                  'After a few attempts, and to your big surprise, you manage to catch the lizard.',
                  'The lizard looks equally surprised.',
                  'You put it in your bag.',
                ].join('\n')
              )
              isLizardFree = false
              disableLizardWalk()
              updatePattern()
              if (buttons.length > 0) {
                reevaluate()
              }
            },
            onUse: () => {
              switch (disk.roomId) {
                case 'blueroom':
                  const blueRoom = getRoom('blueroom')
                  console.log(blueRoom) /* eslint-disable-line */
                  println(
                    'You put the lizard in the wheel, and it starts running immediately.'
                  )
                  blueRoom.enableWheelTurn()
                  // Remove lizard from inventory
                  const lizardIndex = disk.inventory
                    .map((i) => i.name)
                    .indexOf('Lizard')
                  disk.inventory.splice(lizardIndex, 1)
                  // And put it in the blue room
                  blueRoom.items.push({
                    name: 'Lizard',
                    desc: 'The lizard from the Green Room is now powering your jumping fountain bass machine.',
                    isTakeable: false,
                    onTake: () => {
                      println(
                        'The lizard snaps at you with its strange beak. It does not seem willing to stop running in this wheel.'
                      )
                    },
                  })
                  break
                default:
                  println('You can’t use the lizard here.')
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

export default greenRoom
