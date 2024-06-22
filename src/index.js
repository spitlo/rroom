import { initStrudel } from '@strudel/web'

import bespokeCommands from './commands'
import rainbowRoom from './rooms/rainbowroom'
import redRoom from './rooms/redroom'
import orangeRoom from './rooms/orangeroom'
import yellowRoom from './rooms/yellowroom'
import greenRoom from './rooms/greenroom'
import blueRoom from './rooms/blueroom'
import indigoRoom from './rooms/indigoroom'
import violetRoom from './rooms/violetroom'

async function loadSamples() {
  const ds = 'https://raw.githubusercontent.com/felixroos/dough-samples/main/'
  return Promise.all([
    samples(`${ds}/tidal-drum-machines.json`),
    samples(`${ds}/piano.json`),
    samples(`${ds}/Dirt-Samples.json`),
    samples(`${ds}/EmuSP12.json`),
    samples(`${ds}/vcsl.json`),
  ])
}

initStrudel({
  prebake: async () => {
    // console.log('Prebaking') /* eslint-disable-line */
    // samples('github:tidalcycles/dirt-samples')
    // samples('github:felixroos/dough-samples')
    await loadSamples()
  },
})

const click = (id, action) =>
  document.getElementById(id).addEventListener('click', action)

click('a', () => sound('bd').play())
click('b', () => sound('bd*2,hh(3,4),jvbass(5,8,1)').play())
click('c', () =>
  sound('bd*2,hh(3,4),jvbass:[0 4](5,8,1)').stack(sound('~ sd')).play()
)
click('stop', () => hush())

// Override built-in commands
commands = bespokeCommands

// ___  _ ____ _  _
// |  \ | [__  |_/
// |__/ | ___] | \_
// ------------ ---  --- >
const gameDisk = () => ({
  roomId: 'blueroom', // rainbowroom
  cpm: 60,
  isPlaying: false,
  inventory: [],
  rooms: [
    rainbowRoom,
    redRoom, // R-peggiator? Or siren?, blood? D-E. "Spirit of the Lord".
    orangeRoom, // Organ, fire. Matches needded? E-F. "Spirit of Wisdom".
    yellowRoom, // Light? F-G. "Spirit of Understanding".
    greenRoom, // Vegetation, lizard. G-A. "Spirit of Counsel".
    blueRoom, // Bass, water. A-B. "Spirit of Might".
    indigoRoom, // Electricity? B-C. "Spirit of Knowledge".
    violetRoom, // Vox. Humanoid? C-D. "Spirit of the Fear of the Lord".
  ],
})

export default gameDisk
