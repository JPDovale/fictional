import { Button } from '@components/useFull/Button'
import { Snowflake } from 'lucide-react'
import * as Tabs from '@radix-ui/react-tabs'

interface AboutButtonTriggerProps {
  sideBarIsOpen: boolean
}

export function AboutButtonTrigger({ sideBarIsOpen }: AboutButtonTriggerProps) {
  return (
    <Tabs.Trigger
      value="projectStructure"
      className="flex w-full flex-col rounded-md data-[state=active]:bg-gray100"
    >
      <Button.Root asChild className="shadow-none bg-transparent" size="xs">
        <div>
          {sideBarIsOpen && (
            <Button.Text className="font-title">Sobre</Button.Text>
          )}

          {!sideBarIsOpen && (
            <Button.Icon>
              <Snowflake />
            </Button.Icon>
          )}
        </div>
      </Button.Root>
    </Tabs.Trigger>
  )
}
