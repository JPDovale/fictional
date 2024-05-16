import { SuggestionProps } from '@tiptap/suggestion'
import { VenetianMask } from 'lucide-react'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { useTheme } from '@hooks/useTheme'
import { mentionListStyles, mentionSelectStyles } from './styles'

export const MentionList = forwardRef<HTMLElement, SuggestionProps>(
  (props, ref) => {
    const { theme } = useTheme()
    const [selectedIndex, setSelectedIndex] = useState(0)

    const selectItem = (index: number) => {
      const item = props.items[index]

      if (item) {
        props.command({ id: item })
      }
    }

    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length,
      )
    }

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length)
    }

    const enterHandler = () => {
      selectItem(selectedIndex)
    }

    useEffect(() => setSelectedIndex(0), [props.items])

    useImperativeHandle<HTMLElement, any>(ref, () => ({
      onKeyDown: ({ event }: { event: any }) => {
        if (event.key === 'ArrowUp') {
          upHandler()
          return true
        }

        if (event.key === 'ArrowDown') {
          downHandler()
          return true
        }

        if (event.key === 'Enter') {
          enterHandler()
          return true
        }

        return false
      },
    }))

    return (
      <Popover.Root open>
        <Popover.Content className="">
          <div className={mentionListStyles({ theme })}>
            {props.items.length ? (
              props.items.map((item: string, index) => (
                <button
                  type="button"
                  className={mentionSelectStyles({ theme })}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => selectItem(index)}
                >
                  <VenetianMask className="w-5 h-5 fill-purple900" />
                  <span>
                    {item.split('<==>')[0]}
                    {item.split('<==>')[2]}
                  </span>
                </button>
              ))
            ) : (
              <div
                data-theme={theme}
                className="text-text100 data-[theme=light]:text-text800 leading-none px-2 py-0.5 flex text-xs items-center"
              >
                No result
              </div>
            )}
          </div>
        </Popover.Content>
      </Popover.Root>
    )
  },
)
