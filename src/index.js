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

// Override built-in commands
commands = bespokeCommands

// Initiate Strudel
initStrudel()

// ___  _ ____ _  _
// |  \ | [__  |_/
// |__/ | ___] | \_
// ------------ ---  --- >
const gameDisk = () => ({
  roomId: 'rainbowroom', // rainbowroom
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
