const android = {
  name: ['Android'],
  roomId: '',
  desc: [
    'The android looks like something from a past future. Its domed head is not shiny or smooth as you’d expect.',
    'The shape seems more like it’s been conjured by a blacksmith than an engineer or a machine.',
    'Beneath the wide oval screen that seemingly functions as the android’s eyes, a small square mouth opens and shuts erratically, but does not form any coherent words.',
    'Do androids even need mouths?',
  ].join('\n'),
  topics: [
    {
      option: 'What’s your **name**?',
      keyword: 'name',
      line: '"Look," you say. "This feels weird. Can I call you something?"',
      onSelected: () => {
        android.name.push('Violet')
        println('YOU CAN CALL ME VIOLET:', 'android')
      },
      removeOnRead: true,
      prereqs: [],
    },
    {
      option: '',
      keyword: '',
      line: '',
      onSelected: () => {},
      removeOnRead: true,
      prereqs: ['name'],
    },
  ],
  onTalk: () => {
    println('You decide you should perhaps try to communicate wth the android.')
  },
  onLook: () => {
    println('Look')
  },
}

export default android
