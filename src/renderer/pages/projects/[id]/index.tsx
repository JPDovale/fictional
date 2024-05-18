import { NotFound } from '@rComponents/application/NotFound'
import { useProject } from '@rHooks/useProject'
import { useNavigate, useParams } from 'react-router-dom'
import ForceGraph2D, { GraphData } from 'react-force-graph-2d'
import { useTheme } from '@rHooks/useTheme'
import { AttributeType, PersonType } from '@modules/persons/entities/types'

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
}

const attributeTypeNameMapper = {
  [AttributeType.TRAUMA]: 'Trauma',
  [AttributeType.VALUE]: 'Valor',
  [AttributeType.PERSONALITY]: 'Personalidade',
  [AttributeType.OBJECTIVE]: 'Objetivo',
  [AttributeType.DREAM]: 'Sonho',
  [AttributeType.APPEARENCE]: 'Aparencia',
}

export function ProjectPage() {
  const { projectId } = useParams()
  const { project, usePersons, useFoundation, usePersonsAttributes } =
    useProject({
      projectId: projectId as string,
    })
  const { foundation } = useFoundation()
  const { graphBaseColor } = useTheme()
  const { persons } = usePersons()
  const { attributes } = usePersonsAttributes()

  const navigate = useNavigate()

  const personsLinks: { target: string; source: string }[] = []

  persons.forEach((p) => {
    const mentions = p.history?.split('data-id')
      .filter(mention => mention.startsWith('='))
      .map(mention => mention.split('<==>')[1].split('"')[0]) ?? []

    mentions.forEach(mention => {
      personsLinks.push({
        source: p.id,
        target: mention
      })
    })

    personsLinks.push({
      source: p.id,
      target: personTypeTargetMapper[p.type],
    })

    if (foundation?.whoHappens.includes(p.id)) {
      personsLinks.push({
        source: p.id,
        target: '5',
      })
    }

    if (foundation?.whyHappens.includes(p.id)) {
      personsLinks.push({
        source: p.id,
        target: '3',
      })
    }

    if (foundation?.whatHappens.includes(p.id)) {
      personsLinks.push({
        source: p.id,
        target: '2',
      })
    }

    if (foundation?.whereHappens.includes(p.id)) {
      personsLinks.push({
        source: p.id,
        target: '4',
      })
    }

    const personAttributes = attributes.filter((attr) => attr.personId === p.id)

    personAttributes.forEach((a) => {
      personsLinks.push({
        source: p.id,
        target: a.id,
      })
    })

    if (!p.fatherId && !p.motherId) return

    if (p.fatherId) {
      personsLinks.push({
        source: p.id,
        target: p.fatherId,
      })
    }

    if (p.motherId) {
      personsLinks.push({
        source: p.id,
        target: p.motherId,
      })
    }
  })

  const data: GraphData = {
    nodes: [
      {
        id: '19',
        label: 'Personagens',
        color: graphBaseColor,
      },
      {
        id: '20',
        label: 'Protagonistas',
        color: graphBaseColor,
      },
      {
        id: '21',
        label: 'Alivio comico',
        color: graphBaseColor,
      },
      {
        id: '22',
        label: 'Figurantes',
        color: graphBaseColor,
      },
      {
        id: '23',
        label: 'Mentores',
        color: graphBaseColor,
      },
      {
        id: '24',
        label: 'Simbólicos',
        color: graphBaseColor,
      },
      {
        id: '25',
        label: 'Adversários',
        color: graphBaseColor,
      },
      {
        id: '26',
        label: 'Secundários',
        color: graphBaseColor,
      },
      {
        id: '27',
        label: 'Suporte',
        color: graphBaseColor,
      },
      {
        id: '28',
        label: 'Antagonistas',
        color: graphBaseColor,
      },

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
    ],
    links: [
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
      {
        source: '19',
        target: '20',
      },
      {
        source: '19',
        target: '21',
      },
      {
        source: '19',
        target: '22',
      },
      {
        source: '19',
        target: '23',
      },
      {
        source: '19',
        target: '24',
      },
      {
        source: '19',
        target: '25',
      },
      {
        source: '19',
        target: '26',
      },
      {
        source: '19',
        target: '27',
      },
      {
        source: '19',
        target: '28',
      },

      ...personsLinks,
    ],
  }

  if (!project) return <NotFound />

  return (
    <main className="w-full absolute h-screen -top-48 overflow-hidden">
      <ForceGraph2D
        height={window.innerHeight}
        width={window.innerWidth}
        graphData={data}
        onNodeClick={(node) => {
          if (!node || !node.path) return
          navigate(node.path)
        }}
        maxZoom={12}
        minZoom={1.2}
        nodeAutoColorBy="group"
        linkCanvasObject={(link, ctx) => {
          ctx.strokeStyle = `${graphBaseColor}50`
          ctx.lineWidth = 0.1
          ctx.beginPath()
          ctx.moveTo(link.source?.x ?? 0, link.source?.y ?? 0)
          ctx.lineTo(link.target?.x ?? 0, link.target?.y ?? 0)
          ctx.stroke()
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const { label } = node
          const fontSize = 12 / globalScale

          if (globalScale > 2) {
            ctx.font = `${fontSize}px Roboto`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = node.color
            ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + 15 / globalScale)
          }

          ctx.beginPath()
          ctx.arc(node.x ?? 0, node.y ?? 0, 4 / globalScale, 0, 2 * Math.PI)
          ctx.fillStyle = node.color ?? 'white'
          ctx.fill()
        }}
      />
    </main>
  )
}
