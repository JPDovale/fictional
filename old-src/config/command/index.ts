import { getCommands } from '@utils/commands/getCommands';
import { CommandInterface } from './types';
import { commands } from './commands';

export const commandInterfaces: CommandInterface[] = [
  {
    title: 'Sugestões',
    commands: getCommands(commands),
  },
];
