import { NotFound } from '@rComponents/application/NotFound';
import { useProject } from '@rHooks/useProject';
import { useNavigate, useParams } from 'react-router-dom';
import ForceGraph2D, { GraphData } from 'react-force-graph-2d';
import { useTheme } from '@rHooks/useTheme';
import { PersonType } from '@modules/persons/entities/types';
import { attributeTypeNameMapper } from '@rConfigs/projectFolderTree/persons';

const personTypeTargetMapper = {
  [PersonType.SUPPORTING]: '27',
  [PersonType.SECONDARY]: '26',
  [PersonType.MENTOR]: '23',
  [PersonType.ADVERSARY]: '25',
  [PersonType.SYMBOLIC]: '24',
  [PersonType.EXTRA]: '22',
  [PersonType.COMIC]: '21',
  [PersonType.PROTAGONIST]: '20',
  [PersonType.ANTAGONIST]: '28',
};

export function ProjectPage() {
  const { projectId } = useParams();
  const {
    project,
    usePersons,
    useFoundation,
    usePersonsAttributes,
    isLoadingProject,
  } = useProject({ projectId });
  const { foundation } = useFoundation();
  const { graphBaseColor } = useTheme();
  const { persons } = usePersons();
  const { attributes } = usePersonsAttributes();

  const navigate = useNavigate();

  const personsNodes = [
    ...persons.map((p) => ({
      id: p.id,
      label: p.name,
      color: graphBaseColor,
    })),
    ...attributes.map((a) => ({
      id: a.id,
      label: `${attributeTypeNameMapper[a.type]} - ${a.file.title}`,
      color: graphBaseColor,
    })),
  ];

  const personsLinks: { target: string; source: string }[] = [];

  const protagonists = persons.filter((p) => p.type === PersonType.PROTAGONIST);
  const secondaries = persons.filter((p) => p.type === PersonType.SECONDARY);
  const mentors = persons.filter((p) => p.type === PersonType.MENTOR);
  const adversaries = persons.filter((p) => p.type === PersonType.ADVERSARY);
  const symbolics = persons.filter((p) => p.type === PersonType.SYMBOLIC);
  const extras = persons.filter((p) => p.type === PersonType.EXTRA);
  const comics = persons.filter((p) => p.type === PersonType.COMIC);
  const supporting = persons.filter((p) => p.type === PersonType.SUPPORTING);
  const antagonists = persons.filter((p) => p.type === PersonType.ANTAGONIST);

  if (persons.length > 0) {
    personsNodes.push({
      id: '19',
      label: 'Personagens',
      color: graphBaseColor,
    });
  }

  if (protagonists.length > 0) {
    personsNodes.push({
      id: '20',
      label: 'Protagonistas',
      color: graphBaseColor,
    });

    personsLinks.push({
      source: '19',
      target: '20',
    });
  }

  if (secondaries.length > 0) {
    personsNodes.push({
      id: '26',
      label: 'Secundários',
      color: graphBaseColor,
    });

    personsLinks.push({
      source: '19',
      target: '26',
    });
  }

  if (mentors.length > 0) {
    personsNodes.push({
      id: '23',
      label: 'Mentores',
      color: graphBaseColor,
    });

    personsLinks.push({
      source: '19',
      target: '23',
    });
  }

  if (adversaries.length > 0) {
    personsNodes.push({
      id: '25',
      label: 'Adversários',
      color: graphBaseColor,
    });

    personsLinks.push({
      source: '19',
      target: '25',
    });
  }

  if (symbolics.length > 0) {
    personsNodes.push({
      id: '24',
      label: 'Simbólicos',
      color: graphBaseColor,
    });

    personsLinks.push({
      source: '19',
      target: '24',
    });
  }

  if (extras.length > 0) {
    personsNodes.push({
      id: personTypeTargetMapper[PersonType.EXTRA],
      label: 'Figurantes',
      color: graphBaseColor,
    });

    personsLinks.push({
      source: '19',
      target: personTypeTargetMapper[PersonType.EXTRA],
    });
  }

  if (comics.length > 0) {
    personsNodes.push({
      id: personTypeTargetMapper[PersonType.COMIC],
      label: 'Alivio comico',
      color: graphBaseColor,
    });

    personsLinks.push({
      source: '19',
      target: personTypeTargetMapper[PersonType.COMIC],
    });
  }

  if (supporting.length > 0) {
    personsNodes.push({
      id: personTypeTargetMapper[PersonType.SUPPORTING],
      label: 'Suporte',
      color: graphBaseColor,
    });

    personsLinks.push({
      source: '19',
      target: personTypeTargetMapper[PersonType.SUPPORTING],
    });
  }

  if (antagonists.length > 0) {
    personsNodes.push({
      id: personTypeTargetMapper[PersonType.ANTAGONIST],
      label: 'Antagonistas',
      color: graphBaseColor,
    });

    personsLinks.push({
      source: '19',
      target: personTypeTargetMapper[PersonType.ANTAGONIST],
    });
  }

  persons.forEach((p) => {
    const mentions =
      p.history
        ?.split('data-id')
        .filter((mention) => mention.startsWith('='))
        .map((mention) => mention.split('<==>')[1].split('"')[0]) ?? [];

    mentions.forEach((mention) => {
      personsLinks.push({
        source: p.id,
        target: mention,
      });
    });

    personsLinks.push({
      source: p.id,
      target: personTypeTargetMapper[p.type],
    });

    if (foundation?.whoHappens.includes(p.id)) {
      personsLinks.push({
        source: p.id,
        target: '5',
      });
    }

    if (foundation?.whyHappens.includes(p.id)) {
      personsLinks.push({
        source: p.id,
        target: '3',
      });
    }

    if (foundation?.whatHappens.includes(p.id)) {
      personsLinks.push({
        source: p.id,
        target: '2',
      });
    }

    if (foundation?.whereHappens.includes(p.id)) {
      personsLinks.push({
        source: p.id,
        target: '4',
      });
    }

    const personAttributes = attributes.filter(
      (attr) => attr.personId === p.id
    );

    personAttributes.forEach((a) => {
      personsLinks.push({
        source: p.id,
        target: a.id,
      });
    });

    if (!p.fatherId && !p.motherId) return;

    if (p.fatherId) {
      personsLinks.push({
        source: p.id,
        target: p.fatherId,
      });
    }

    if (p.motherId) {
      personsLinks.push({
        source: p.id,
        target: p.motherId,
      });
    }
  });

  const foundationNodes = [
    {
      id: '1',
      label: 'Fundamento',
      path: `/projects/${projectId}/foundation/foundation-text`,
      color: graphBaseColor,
    },
    {
      id: '2',
      label: 'O que acontece?',
      path: `/projects/${projectId}/foundation/what-happens`,
      color: graphBaseColor,
    },
    {
      id: '3',
      label: 'Por que acontece?',
      path: `/projects/${projectId}/foundation/why-happens`,
      color: graphBaseColor,
    },
    {
      id: '4',
      label: 'Onde acontece?',
      path: `/projects/${projectId}/foundation/where-happens`,
      color: graphBaseColor,
    },
    {
      id: '5',
      label: 'Com quem acontece?',
      path: `/projects/${projectId}/foundation/who-happens`,
      color: graphBaseColor,
    },
  ];

  const foundationLinks = [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
    {
      source: '1',
      target: '4',
    },
    {
      source: '1',
      target: '5',
    },
  ];

  const data: GraphData = {
    nodes: [
      ...(project?.buildBlocks.FOUNDATION ? foundationNodes : []),
      ...(project?.buildBlocks.PERSONS ? personsNodes : []),
    ],
    links: [
      ...(project?.buildBlocks.FOUNDATION ? foundationLinks : []),
      ...(project?.buildBlocks.PERSONS ? personsLinks : []),
    ],
  };

  if (!project && !isLoadingProject) return <NotFound />;

  return (
    <main className="w-full absolute h-screen -top-48 overflow-hidden">
      {data.nodes.length > 0 && data.links.length > 0 ? (
        <ForceGraph2D
          height={window.innerHeight}
          width={window.innerWidth}
          graphData={data}
          onNodeClick={(node) => {
            if (!node || !node.path) return;
            navigate(node.path);
          }}
          maxZoom={12}
          minZoom={1.2}
          nodeAutoColorBy="group"
          linkCanvasObject={(link, ctx) => {
            ctx.strokeStyle = `${graphBaseColor}50`;
            ctx.lineWidth = 0.1;
            ctx.beginPath();
            ctx.moveTo(link.source?.x ?? 0, link.source?.y ?? 0);
            ctx.lineTo(link.target?.x ?? 0, link.target?.y ?? 0);
            ctx.stroke();
          }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const { label } = node;
            const fontSize = 12 / globalScale;

            if (globalScale > 2) {
              ctx.font = `${fontSize}px Roboto`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = node.color;
              ctx.fillText(
                label,
                node.x ?? 0,
                (node.y ?? 0) + 15 / globalScale
              );
            }

            ctx.beginPath();
            ctx.arc(node.x ?? 0, node.y ?? 0, 4 / globalScale, 0, 2 * Math.PI);
            ctx.fillStyle = node.color ?? 'white';
            ctx.fill();
          }}
        />
      ) : (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold opacity-30">
          Não há nada por aqui ainda...
        </span>
      )}
    </main>
  );
}
