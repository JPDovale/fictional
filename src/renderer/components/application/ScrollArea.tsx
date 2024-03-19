import * as Scroll from '@radix-ui/react-scroll-area'
import { ReactNode } from 'react'

interface ScrollAreaProps {
  children: ReactNode
}

export function ScrollArea({ children }: ScrollAreaProps) {
  return (
    <Scroll.Root className="overflow-hidden h-full">
      <Scroll.Viewport className="w-full h-full rounded">
        {children}
      </Scroll.Viewport>

      <Scroll.Scrollbar
        className="flex select-none touch-none bg-gray300 hover:bg-gray800 data-[orientation=vertical]:w-[4px] data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <Scroll.Thumb className="flex-1 bg-gray100 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </Scroll.Scrollbar>
      <Scroll.Corner />
    </Scroll.Root>
  )
}
