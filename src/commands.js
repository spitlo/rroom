import { reevaluate } from './utils'

let help = () => {
  const instructions = `The following commands are available:
    LOOK:           'look at key'
    TAKE:           'take book'
    GO:             'go north' (or just type 'n')
    USE:            'use bucket'
    PRESS:          'press play'
    TALK:           'talk to mary'
    ITEMS:          list items in the room
    CHARS:          list characters in the room
    INV:            list inventory items
    SAVE/LOAD:      save current game, or load a saved game (in memory)
    IMPORT/EXPORT:  save current game, or load a saved game (on disk)
    HELP:           this help menu
  `
  println(instructions)
}

const mute = (roomId) => {
  if (disk.roomId === 'rainbowroom') {
    const room = getRoom(roomId)
    room.isMuted = true
    reevaluate()
    println(`You muted the ${roomId} room`)
  } else {
    println(`You probably need som kind of control panel to do that.`)
  }
}

const press = (item = '') => {
  if (disk.roomId === 'rainbowroom') {
    if (item.toLowerCase() === 'play') {
      if (disk.isPlaying) {
        println(
          'Already playing. If you don’t hear anything, perhaps you need to find something that can generate sounds?'
        )
      } else {
        const activeRooms = disk.rooms
          .filter((room) => room.isActive)
          .filter((room) => !room.isMuted)
          .map((room) => room.color)
        println('You press play.')
        if (activeRooms.length === 0) {
          println('Nothing happens.')
        } else if (activeRooms.length === 1) {
          println(`Music start playing from the ${activeRooms[0]} room.`)
        } else {
          println(`Sweet, weird music starts playing.`)
        }
        disk.isPlaying = true
        reevaluate()
      }
    } else if (item.toLowerCase() === 'stop') {
      if (disk.isPlaying) {
        console.log('Stopping') /* eslint-disable-line */
        disk.isPlaying = false
        hush()
      } else {
        println('Already stopped.')
      }
    }
  } else {
    useItem(item)
  }
}

const customCommands = [
  // No arguments (e.g. "help", "chars", "inv")
  {
    inv,
    i: inv, // shortcut for inventory
    inventory: inv,
    look,
    l: look, // shortcut for look
    go,
    n,
    s,
    e,
    w,
    ne,
    se,
    sw,
    nw,
    talk,
    t: talk, // shortcut for talk
    take,
    get: take,
    items,
    use,
    chars,
    characters: chars,
    help,
    say,
    save,
    load,
    restore: load,
    export: exportSave,
    import: importSave,
  },
  // One argument (e.g. "go north", "take book")
  {
    go: goDir,
    take: takeItem,
    get: takeItem,
    use: useItem,
    say: sayString,
    save: (x) => save(x),
    load: (x) => load(x),
    restore: (x) => load(x),
    x: (x) => lookAt([null, x]), // IF standard shortcut for look at
    t: (x) => talkToOrAboutX('to', x), // IF standard shortcut for talk
    export: exportSave,
    import: importSave, // (ignores the argument)
    mute,
    press,
    push: press,
  },
  // Two+ arguments (e.g. "look at key", "talk to mary")
  {
    look: lookAt,
    take: (args) => takeItem(args.join(' ')),
    get: (args) => takeItem(args.join(' ')),
    use: (args) => useItem(args.join(' ')),
    say(args) {
      const str = args.reduce((cur, acc) => cur + ' ' + acc, '')
      sayString(str)
    },
    talk: (args) => talkToOrAboutX(args[0], args[1]),
    x: (args) => lookAt([null, ...args]),
  },
]

export default customCommands
