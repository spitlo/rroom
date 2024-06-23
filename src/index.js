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
  roomId: 'rainbowroom',
  cpm: 60,
  isPlaying: false,
  inventory: [],
  rooms: [
    rainbowRoom,
    redRoom,
    orangeRoom,
    yellowRoom,
    greenRoom,
    blueRoom,
    indigoRoom,
    violetRoom,
  ],
})

export default gameDisk
