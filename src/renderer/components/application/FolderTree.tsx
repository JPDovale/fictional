import { useTheme } from '@rHooks/useTheme'
import { ChevronDown, LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface NodeTree {
  name: string
  path?: string
  closed?: boolean
  id: string
  childs?: NodeTree[]
  icon?: LucideIcon
}

interface NodeProps {
  node: NodeTree
  level?: number
  nodeSelected: string
  setNodeSelected: (node: string) => void
}

function Node({ node, level = 0, nodeSelected, setNodeSelected }: NodeProps) {
  const [closed, setClosed] = useState(node.closed ?? true)
  const { theme } = useTheme()

  const navigate = useNavigate()

  function handleNodeClick() {
    if (node.childs && node.childs.length > 0) {
      setClosed((prev) => !prev)
      return
    }

    if (node.path) {
      navigate(node.path)
    }

    setNodeSelected(node.id)
  }

  return (
    <div
      data-theme={theme}
      className="flex flex-col gap-1 data-[selected=true]:bg-gray200 data-[selected=true]:data-[theme=light]:bg-gray800"
      data-selected={nodeSelected === node.id}
    >
      <button
        data-theme={theme}
        type="button"
        onClick={handleNodeClick}
        className="text-sm flex items-center gap-1 hover:bg-gray200 data-[theme=light]:hover:bg-gray800"
      >
        <div className="w-3.5 h-3.5">
          {node.childs && node.childs.length > 0 && (
            <div
              data-closed={closed}
              className="w-full h-full data-[closed=true]:-rotate-90"
            >
              <ChevronDown size={14} />
            </div>
          )}
        </div>
        {node.icon && <node.icon size={14} className="fill-purple900" />}
        <span className="opacity-60 w-full">{node.name}</span>
      </button>

      {!closed && (
        <div
          style={{
            marginLeft: (level + 1) * 10,
          }}
          className="border-l border-gray400 pl-1"
        >
          {node.childs && (
            <Tree
              nodes={node.childs}
              level={level + 1}
              nodeSelected={nodeSelected}
              setNodeSelected={setNodeSelected}
            />
          )}
        </div>
      )}
    </div>
  )
}

interface TreeProps {
  nodes: NodeTree[]
  level?: number
  nodeSelected: string
  setNodeSelected: (node: string) => void
}

function Tree({ nodes, level = 0, nodeSelected, setNodeSelected }: TreeProps) {
  return (
    <>
      {nodes.map((node) => (
        <Node
          node={node}
          level={level}
          nodeSelected={nodeSelected}
          setNodeSelected={setNodeSelected}
        />
      ))}
    </>
  )
}

interface FolderTreeProps {
  nodes: NodeTree[]
  nodeSelected: string
  setNodeSelected: (node: string) => void
}

export function FolderTree({
  nodes,
  nodeSelected,
  setNodeSelected,
}: FolderTreeProps) {
  return (
    <div className="w-[3000px] overflow-x-hidden">
      <span className="text-xs p-1 font-bold opacity-60 border-b border-b-gray600 mb-2">
        Explorador
      </span>

      <section className="px-1">
        <Tree
          nodes={nodes}
          nodeSelected={nodeSelected}
          setNodeSelected={setNodeSelected}
        />
      </section>
    </div>
  )
}
