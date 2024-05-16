import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks'
import { useBuildBlocks } from '@rHooks/useBuildBlocks'
import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { tv } from 'tailwind-variants'

const buildBlockUsingStyles = tv({
  base: 'flex flex-col items-center gap-1.5  p-2 rounded-md',
  variants: {
    theme: {
      [Theme.DARK]: 'bg-gray300 shadow-defaultDark',
      [Theme.LIGHT]: 'bg-gray700 shadow-default',
      [Theme.SYSTEM]: '',
    },
  },
})

interface BuildBlockUsingProps {
  buildBlock: BuildBlock
}

export function BuildBlockUsing({ buildBlock }: BuildBlockUsingProps) {
  const { theme } = useTheme()
  const { getIcon, getName } = useBuildBlocks()

  const Icon = getIcon(buildBlock)
  const name = getName(buildBlock)

  return (
    <div className={buildBlockUsingStyles({ theme })}>
      <Icon className="fill-purple900 w-8 h-8" />

      <span className="text-sm uppercase font-bold text-center opacity-70">
        {name}
      </span>
    </div>
  )
}
