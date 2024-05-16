import { Command, Commands } from '@config/command/types'

export function getCommands(commands: Commands): Command[] {
  const commandsToReturn: Command[] = []

  Object.keys(commands).forEach((commandKey) => {
    commandsToReturn.push(commands[commandKey])
  })

  return commandsToReturn
}
