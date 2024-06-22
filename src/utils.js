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
      if (room.muted) {
        soundString = `${soundString}.gain(0)`
      }
      sounds.push(`$: ${soundString}`)
    }
  }

  const allSounds = sounds.join('\n')
  console.log('Re-evaluating ...', allSounds)
  evaluate(allSounds)
}

const onEnter = () => {
  reevaluate()
}

export { getRandomInt, onEnter, reevaluate }
