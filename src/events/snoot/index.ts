import arc from '@architect/functions'

exports.handler = arc.events.subscribe(handler)

async function handler (event: string) {
  console.log(event)
  return
}

