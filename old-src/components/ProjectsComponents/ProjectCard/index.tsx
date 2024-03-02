import { useTheme } from '@hooks/useTheme';
import { useUser } from '@hooks/useUser';
import { Image } from 'lucide-react';
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types';
import { imageStyles, projectCardStyles, projectInfoStyles } from './styles';

interface ProjectCardProps {
  project: ProjectModelResponse;
  onClick: (id: string) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { theme } = useTheme();
  const { data } = useUser();

  return (
    <button
      type="button"
      onClick={() => onClick(project.id)}
      className={projectCardStyles({ theme })}
    >
      <div className={imageStyles()}>
        {project.image.url ? (
          <img
            className="w-full h-full object-cover"
            alt={project.image.alt}
            src={project.image.url}
          />
        ) : (
          <Image size={32} />
        )}
      </div>

      <div className={projectInfoStyles({ theme })}>
        <div className="flex flex-col">
          <span className="opacity-50 font-bold text-xxs uppercase">
            Nome do projeto:
          </span>
          <p className="font-bold text-sm">{project.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="opacity-50 font-bold text-xxs uppercase">
              Tipo:
            </span>
            <p className="font-bold text-sm">{project.type}</p>
          </div>

          <div>
            <span className="opacity-50 font-bold text-xxs uppercase">
              Criador:
            </span>
            <p className="font-bold text-sm">
              {project.creator?.id === data?.user?.account.id
                ? 'Você'
                : project.creator?.username}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
