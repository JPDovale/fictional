import { FloatingMenu, Editor } from '@tiptap/react';
import { RxText } from 'react-icons/rx';
import { Heading1, Heading2, Heading3, Heading4, List } from 'lucide-react';
import * as State from '@tiptap/pm/state';
import { tv } from 'tailwind-variants';
import { Theme } from '@rStores/useInterfaceStore';
import { useTheme } from '@rHooks/useTheme';
import { MenuOption } from './MenuOption';
import { ReactNode } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverPortal,
} from '@rComponents/ui/popover';

export const floatingMenuStyles = tv({
  base: 'shadow-lg border shadow-semiTransparentBack rounded-md overflow-hidden flex flex-col p-2 gap-1',
  variants: {
    theme: {
      [Theme.DARK]: 'bg-gray300 border-gray400',
      [Theme.LIGHT]: 'bg-gray700 border-gray600',
      [Theme.SYSTEM]: '',
    },
  },
});

export interface EditorMenuOption {
  icon: ReactNode;
  title: string;
  description: string;
  handler: () => void;
}

interface FloatingMenuEditorProps {
  editor: Editor | null;
  menuOptions: EditorMenuOption[];
}

interface ItShouldShowProps {
  state: State.EditorState;
}

export function FloatingMenuEditor({
  editor,
  menuOptions = [],
}: FloatingMenuEditorProps) {
  const { theme } = useTheme();

  if (!editor) return null;

  function itShouldShow({ state }: ItShouldShowProps): boolean {
    const { $from } = state.selection;
    const currentLineText = $from.nodeBefore?.textContent;

    return (
      currentLineText === '/' && $from.nodeAfter?.textContent === undefined
    );
  }

  function removeBackSlash() {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .command(({ tr, editor: edt }) => {
        const { doc } = edt.state;
        const newDoc = doc.toJSON();

        function removeBackSlashsFromText(node: any) {
          if (node.content) {
            node.content = node.content.filter(
              (n: any) => !(n.type === 'text' && n.text === '/')
            );

            node.content.forEach(removeBackSlashsFromText);
            if (node.content.length === 0) {
              const { content: _, ...rest } = node;
              node = { ...rest };
            }
          }
        }

        removeBackSlashsFromText(newDoc);

        const newState = editor.schema.nodeFromJSON(newDoc);
        tr.replaceWith(0, doc.nodeSize - 2, newState);
        return true;
      })
      .run();
  }

  if (!editor) return null;

  return (
    <Popover open>
      <PopoverPortal>
        <PopoverContent>
          <FloatingMenu
            tippyOptions={{
              hideOnClick: true,
              placement: 'bottom-end',
            }}
            className={floatingMenuStyles({ theme })}
            editor={editor}
            shouldShow={itShouldShow}
          >
            {menuOptions.length > 0 && (
              <>
                {menuOptions.map((option) => (
                  <MenuOption
                    key={option.title}
                    {...option}
                    handler={() => {
                      option.handler();
                      removeBackSlash();
                    }}
                  />
                ))}
                <div className="w-full h-px bg-gray400"></div>
              </>
            )}
            <MenuOption
              title="Texto"
              description="Comece com um texto simples"
              icon={<RxText className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().setParagraph().run();
                removeBackSlash();
              }}
            />

            <MenuOption
              title="Titulo 1"
              description="Insira um bloco de titulo primário"
              icon={<Heading1 className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                removeBackSlash();
              }}
            />

            <MenuOption
              title="Titulo 2"
              description="Insira um bloco de titulo secundário"
              icon={<Heading2 className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                removeBackSlash();
              }}
            />

            <MenuOption
              title="Titulo 3"
              description="Insira um bloco de titulo terciário"
              icon={<Heading3 className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                removeBackSlash();
              }}
            />

            <MenuOption
              title="Titulo 4"
              description="Insira um bloco de titulo pequeno"
              icon={<Heading4 className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().toggleHeading({ level: 4 }).run();
                removeBackSlash();
              }}
            />

            <MenuOption
              title="Lista"
              description="Insira uma lista numerada"
              icon={<List className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().toggleOrderedList().run();
                removeBackSlash();
              }}
            />
          </FloatingMenu>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
