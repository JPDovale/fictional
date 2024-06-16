import { useTheme } from '@rHooks/useTheme';
import { cn } from '@rUtils/cn';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import * as ResizablePrimitive from 'react-resizable-panels';

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn(
        'flex h-full w-full data-[panel-group-direction=vertical]:flex-col duration-0',
        className
      )}
      {...props}
    />
  );
}

const ResizablePanel = ResizablePrimitive.Panel;

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-theme={theme}
      className={cn(
        'relative flex w-px items-center duration-0 justify-center bg-gray400 data-[theme=light]:bg-gray500 after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
        className
      )}
      {...props}
    >
      {withHandle && (
        <div
          data-theme={theme}
          className="z-10 flex h-8 w-3 items-center justify-center rounded-sm border border-gray400 bg-gray400 data-[theme=light]:bg-gray500 data-[theme=light]:border-gray500"
        >
          <DragHandleDots2Icon className="h-3.5 w-3.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
