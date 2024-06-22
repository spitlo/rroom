import { reevaluate } from './utils'

const mute = (room) => {
  console.log(`You muted the ${room} room`) /* eslint-disable-line */
}

const press = (button = '') => {
  if (disk.roomId === 'rainbowroom') {
    if (button.toLowerCase() === 'play') {
      if (disk.isPlaying) {
        println(
          'Already playing. If you don’t hear anything, perhaps you need to find something that can generate sounds?'
        )
      } else {
        println('You press play.')
        disk.isPlaying = true
        reevaluate()
      }
    } else if (button.toLowerCase() === 'stop') {
      if (disk.isPlaying) {
        console.log('Stopping') /* eslint-disable-line */
        disk.isPlaying = false
        hush()
      } else {
        println('Already stopped.')
      }
    }
  } else {
  }
}

const putXinY = (args) => {
  console.log(args) /* eslint-disable-line */
  let items
  if (args.includes('in')) {
    items = args.split('in')
  } else if (args.includes('on')) {
    items = args.split('in')
  }
  // if (['in', 'on', ''].includes(args[1])) {
  // }
  console.log(items) /* eslint-disable-line */
}

const bespokeCommands = [
  // no arguments (e.g. "help", "chars", "inv")
  {
    inv,
    i: inv, // shortcut for inventory
    inventory: inv,
    look,
    l: look, // shortcut for look
    go,
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
  // one argument (e.g. "go north", "take book")
  {
    // look: lookThusly,
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
    press,
    put: (args) => putXinY([null, ...args].join(' ')),
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

export default bespokeCommands
