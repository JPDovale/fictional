import { useTheme } from '@hooks/useTheme';
import { PersonModelResponse } from '@modules/Persons/dtos/models/types';
import * as Avatar from '@radix-ui/react-avatar';
import { VenetianMask } from 'lucide-react';
import { personCardStyles } from './styles';

interface PersonCardProps {
  person: PersonModelResponse;
  onClick: (id: string) => void;
}

export function PersonCard({ person, onClick }: PersonCardProps) {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      className={personCardStyles({ theme })}
      onClick={() => onClick(person.id)}
    >
      <Avatar.Root className="bg-transparent max-w-[8rem] min-w-[8rem] max-h-[8rem] min-h-[8rem] flex items-center justify-center rounded-full overflow-hidden mt-4 border border-purple900">
        <Avatar.Image
          className="rounded-full bg-transparent h-full w-full overflow-hidden"
          src={person.image.url ?? undefined}
          alt={person.image.alt}
        />
        <Avatar.Fallback>
          <VenetianMask className="w-8 h-8 fill-purple800 " />
        </Avatar.Fallback>
      </Avatar.Root>

      <span
        data-theme={theme}
        className="mt-8 font-title text-center opacity-60 data-[theme=light]:font-bold"
      >
        {person.name ? person.name.fullName : '??????????'}
      </span>

      {person.biography && (
        <span
          data-theme={theme}
          className="text-xs p-3 w-full opacity-60 text-start"
        >
          {person.biography.slice(0, 140)}...
        </span>
      )}
    </button>
  );
}
