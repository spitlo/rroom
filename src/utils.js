const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const reevaluate = () => {
  if (!disk.isPlaying) {
    return
  }

  const sounds = []
  for (const room of disk.rooms) {
    if (room && room.generateSoundString) {
      let soundString = room.generateSoundString()
      if (!soundString) {
        continue
      }
      if (room.id !== disk.roomId && disk.roomId !== 'rainbowroom') {
        // This is one of the romms we’re not in. Make it sound distant.
        soundString = `${soundString}.gain(0.2).lpf(500).room(0.7)`
      } else if (disk.roomId === 'rainbowroom') {
        // In the Rainbow Room we hear all rooms, set all volumes to 60%
        soundString = `${soundString}.gain(0.6)`
      } else {
        // We're in this room, set volume to max
        soundString = `${soundString}.gain(1)`
      }
      if (room.isMuted) {
        soundString = `${soundString}.gain(0)`
      }
      sounds.push(`$: ${soundString}`)
    }
  }

  const allSounds = sounds.join('\n')
  if (allSounds.length > 0) {
    console.log('Re-evaluating ...', allSounds)
    evaluate(allSounds)
  }
}

const onEnter = (roomId) => {
  if (roomId && !disk.visitedRooms.includes(roomId)) {
    disk.visitedRooms.push(roomId)
  }

  reevaluate()
}

export { getRandomInt, onEnter, reevaluate }
