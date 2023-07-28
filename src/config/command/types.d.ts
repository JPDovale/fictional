import { LucideIcon } from 'lucide-react';

export interface CommandLink {
  pathname: string;
  Icon: LucideIcon;
  label: string;
}

export interface Command {
  key: string;
  link?: CommandLink;
  execute?: () => void;
}

export interface Commands {
  [X: string]: Command;
}

export interface CommandInterface {
  title: string;
  commands: Command[];
}
