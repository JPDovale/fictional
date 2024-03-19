import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@rComponents/ui/context-menu'
import { useTheme } from '@rHooks/useTheme'
import { ChevronDown, LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Action {
  label: string
  path: string
  Icon: LucideIcon
}

export interface NodeTree {
  name: string
  path?: string
  closed?: boolean
  isToShow?: boolean
  id: string
  childs?: NodeTree[]
  icon?: LucideIcon
  actions?: Action[]
}

interface NodeProps {
  node: NodeTree
  level?: number
  nodeSelected: string
  setNodeSelected: (node: string) => void
}

function Node({
  node: {
    name,
    childs,
    icon: Icon,
    closed: startClosed = true,
    id,
    path,
    isToShow = true,
    actions = [],
  },
  level = 0,
  nodeSelected,
  setNodeSelected,
}: NodeProps) {
  const [closed, setClosed] = useState(startClosed)
  const { theme } = useTheme()

  const navigate = useNavigate()

  function handleNodeClick() {
    if (childs && childs.length > 0) {
      setClosed((prev) => !prev)
      return
    }

    if (path) {
      navigate(path)
    }

    setNodeSelected(id)
  }

  if (!isToShow) return null

  return (
    <div
      data-theme={theme}
      className="flex flex-col gap-1 data-[selected=true]:bg-gray200 data-[selected=true]:data-[theme=light]:bg-gray800"
      data-selected={nodeSelected === id}
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <button
            data-theme={theme}
            type="button"
            onClick={handleNodeClick}
            className="text-sm flex items-center gap-1 hover:bg-gray200 data-[theme=light]:hover:bg-gray800"
          >
            <div className="w-3.5 h-3.5">
              {childs && childs.length > 0 && (
                <div
                  data-closed={closed}
                  className="w-full h-full data-[closed=true]:-rotate-90"
                >
                  <ChevronDown size={14} />
                </div>
              )}
            </div>
            {Icon && <Icon size={14} className="fill-purple900" />}
            <span className="opacity-60 w-full">{name}</span>
          </button>
        </ContextMenuTrigger>

        {actions.length > 0 && (
          <ContextMenuContent className="w-64 flex flex-col gap-0 p-0">
            {actions.map((action) => (
              <ContextMenuItem
                onClick={() => navigate(action.path)}
                data-theme={theme}
                className="w-full text-sm flex text-text800 gap-2 items-center hover:bg-gray700 cursor-pointer font-body data-[theme=dark]:hover:bg-gray300 px-2 py-0.5 data-[theme=dark]:text-text100"
              >
                <action.Icon size={14} className="fill-purple900" />
                <span className="opacity-60 w-full">{action.label}</span>
              </ContextMenuItem>
            ))}
          </ContextMenuContent>
        )}
      </ContextMenu>

      {!closed && (
        <div
          style={{
            marginLeft: (level + 1) * 10,
          }}
          className="border-l border-gray400 pl-1"
        >
          {childs && (
            <Tree
              nodes={childs}
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
