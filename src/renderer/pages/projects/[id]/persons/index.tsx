import ForceGraph2D from 'react-force-graph-2d'

export function ProjectPersonsPage() {
  const data = {
    nodes: [
      { id: '1', label: 'Node 1', img: 'teste' },
      { id: '2', label: 'Node 2' },
    ],
    links: [],
  }

  return (
    <main className="w-full absolute h-screen -top-48 overflow-hidden">
      <ForceGraph2D
        height={window.innerHeight}
        width={window.innerWidth}
        graphData={data}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const { label } = node
          const fontSize = 12 / globalScale
          ctx.font = `${fontSize}px Sans-Serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = node.color
          ctx.fillText(label, node.x ?? 0, node.y ?? 0)
        }}
      />
    </main>
  )
}
