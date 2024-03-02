import { Button } from '@components/useFull/Button';
import * as Tabs from '@radix-ui/react-tabs';

interface EditorButtonTriggerProps {
  isToShowContent: boolean;
}

export function EditorButtonTrigger({
  isToShowContent,
}: EditorButtonTriggerProps) {
  if (!isToShowContent) return null;

  return (
    <Tabs.Trigger
      value="editor"
      className="flex w-full flex-col rounded-md data-[state=active]:bg-gray100"
    >
      <Button.Root asChild className="shadow-none bg-transparent" size="xs">
        <div>
          <Button.Text className="font-title">Editor</Button.Text>
        </div>
      </Button.Root>
    </Tabs.Trigger>
  );
}
