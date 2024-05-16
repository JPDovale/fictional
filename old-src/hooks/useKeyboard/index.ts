import { commands } from '@config/command/commands'
import { useEffect } from 'react'

export function useKeyboard() {
  useEffect(() => {
    const pressedKeys = new Set()

    function checkKeyCombinations() {
      const keysArray = Array.from(pressedKeys) as string[]
      let commandRequested = ''

      keysArray.forEach((k, i) => {
        if (i === 0) {
          commandRequested = k
          return
        }

        commandRequested = `${commandRequested}+${
          k.length === 1 ? k.toUpperCase() : k
        }`
      })

      if (commands[commandRequested] && commands[commandRequested].execute) {
        commands[commandRequested].execute!()
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      const { key } = event
      pressedKeys.add(key)

      checkKeyCombinations()
    }

    function handleKeyUp(event: KeyboardEvent) {
      const { key } = event
      pressedKeys.delete(key)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
}
