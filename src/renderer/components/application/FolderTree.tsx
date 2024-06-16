import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuLabel,
} from '@rComponents/ui/context-menu';
import { useTheme } from '@rHooks/useTheme';

import { isString } from 'lodash';
import { ChevronDown, Folder, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Action {
  label: string;
  action: () => void | string;
  Icon: LucideIcon;
  type?: 'default' | 'danger';
}

interface ActionGroup {
  title: string;
  actions: Action[];
}

export interface NodeTree {
  name: string;
  path?: string;
  closed?: boolean;
  isToShow?: boolean;
  id: string;
  childs?: NodeTree[];
  icon?: LucideIcon;
  actions?: Action[];
  acctionGroups?: ActionGroup[];
}

interface NodeProps {
  node: NodeTree;
  level?: number;
  nodeSelected: string;
  setNodeSelected: (node: string) => void;
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
    acctionGroups = [],
  },
  level = 0,
  nodeSelected,
  setNodeSelected,
}: NodeProps) {
  const [closed, setClosed] = useState(startClosed);
  const { theme } = useTheme();

  const navigate = useNavigate();

  function handleNodeClick() {
    if (childs && childs.length > 0) {
      setClosed((prev) => !prev);
      return;
    }

    if (path) {
      navigate(path);
    }

    setNodeSelected(id);
  }

  if (!isToShow) return null;

  return (
    <div
      data-theme={theme}
      className="flex flex-col data-[selected=true]:bg-gray200 data-[selected=true]:data-[theme=light]:bg-gray800"
      data-selected={nodeSelected === id}
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <button
            data-theme={theme}
            type="button"
            onClick={handleNodeClick}
            className="text-xs leading-none py-[0.3125rem] flex items-center gap-2 hover:bg-gray200 data-[theme=light]:hover:bg-gray800"
          >
            <div className="w-3.5 h-3.5">
              {childs && childs.length > 0 && (
                <div
                  data-closed={closed}
                  className="w-full h-full data-[closed=true]:-rotate-90"
                >
                  <ChevronDown size={16} className="opacity-40" />
                </div>
              )}
            </div>
            {Icon && <Icon size={16} className="-ml-1 font-bold opacity-60 " />}
            <span className="w-full opacity-60 font-bold">{name}</span>
          </button>
        </ContextMenuTrigger>

        {(actions.length > 0 || acctionGroups.length > 0) && (
          <ContextMenuContent className="w-56 flex flex-col gap-0 p-0.5">
            {acctionGroups.map((group) => (
              <>
                <ContextMenuGroup key={group.title}>
                  <ContextMenuLabel className="py-0.5 px-1.5">
                    {group.title}
                  </ContextMenuLabel>

                  {group.actions.map((action) => {
                    function handleClick() {
                      const res = action.action();
                      if (res && isString(res)) {
                        navigate(res);
                      }
                    }

                    return (
                      <ContextMenuItem
                        onClick={handleClick}
                        data-theme={theme}
                        key={action.label}
                        className="w-full flex text-text800 gap-2 items-center hover:bg-gray700 cursor-pointer font-body data-[theme=dark]:hover:bg-gray300 px-2 py-0.5 data-[theme=dark]:text-text100"
                      >
                        <action.Icon
                          size={14}
                          data-type={action.type}
                          className="fill-purple900 data-[type=danger]:fill-fullError"
                        />
                        <span className="opacity-60 w-full">
                          {action.label}
                        </span>
                      </ContextMenuItem>
                    );
                  })}
                </ContextMenuGroup>
                <ContextMenuSeparator />
              </>
            ))}

            {actions.map((action) => {
              function handleClick() {
                const res = action.action();
                if (res && isString(res)) {
                  navigate(res);
                }
              }

              return (
                <ContextMenuItem
                  onClick={handleClick}
                  data-theme={theme}
                  key={action.label}
                  className="w-full flex text-text800 gap-2 items-center hover:bg-gray700 cursor-pointer font-body data-[theme=dark]:hover:bg-gray300 px-2 py-0.5 data-[theme=dark]:text-text100"
                >
                  <action.Icon
                    size={14}
                    data-type={action.type}
                    className="fill-purple900 data-[type=danger]:fill-fullError/80"
                  />
                  <span
                    data-type={action.type}
                    className="opacity-60 w-full data-[type=danger]:text-fullError"
                  >
                    {action.label}
                  </span>
                </ContextMenuItem>
              );
            })}
          </ContextMenuContent>
        )}
      </ContextMenu>

      {!closed && (
        <div
          style={{
            marginLeft: (level + 1) * 8 - level * (2 * level - 1.3),
          }}
          className="border-l border-gray400"
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
  );
}

interface TreeProps {
  nodes: NodeTree[];
  level?: number;
  nodeSelected: string;
  setNodeSelected: (node: string) => void;
}

function Tree({ nodes, level = 0, nodeSelected, setNodeSelected }: TreeProps) {
  return (
    <>
      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          level={level}
          nodeSelected={nodeSelected}
          setNodeSelected={setNodeSelected}
        />
      ))}
    </>
  );
}

interface FolderTreeProps {
  nodes: NodeTree[];
  nodeSelected: string;
  title?: string;
  setNodeSelected: (node: string) => void;
}

export function FolderTree({
  nodes,
  nodeSelected,
  title = '',
  setNodeSelected,
}: FolderTreeProps) {
  const { theme } = useTheme();
  return (
    <div className="relative overflow-x-hidden max-h-screen overflow-y-auto w-full pb-8">
      <div className="w-full min-w-[24rem] ">
        <div
          data-theme={theme}
          className="text-xs z-[3] fixed p-[0.3125rem] w-full font-bold border-b border-b-gray400 flex items-center bg-gray200 gap-2.5 pl-5 data-[theme=light]:bg-gray800"
        >
          <Folder size={16} className="opacity-60" />
          <span className="opacity-60">Explorador: {title}</span>
        </div>
        <span className="text-xs p-[0.3125rem] font-bold opacity-0 border-b border-b-gray600 flex items-center gap-2.5 pl-5">
          <Folder size={16} />
          Explorador: {title}
        </span>
        <section className="ml-1">
          <Tree
            nodes={nodes}
            nodeSelected={nodeSelected}
            setNodeSelected={setNodeSelected}
          />
        </section>
      </div>
    </div>
  );
}
