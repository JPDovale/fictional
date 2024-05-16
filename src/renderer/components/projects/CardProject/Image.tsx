import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { ImgHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const overlayStyles = tv({
  base: 'absolute inset-0 bg-gradient-to-r ',
  variants: {
    theme: {
      [Theme.DARK]: 'from-gray100/80 to-gray100/30',
      [Theme.LIGHT]: 'from-base300/80 to-base300/30',
      [Theme.SYSTEM]: '',
    },
  },
})

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

export function Image({ ...props }: ImageProps) {
  const { theme } = useTheme()
  return (
    <div className="relative">
      <img
        alt=""
        {...props}
        data-has-src={!!props.src}
        className="max-h-40 w-full min-h-40 h-40 object-cover data-[has-src=false]:opacity-0"
      />
      <span className={overlayStyles({ theme })} />
      <h4 className="absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] text-3xl font-bold text-text900 uppercase text-center font-title">
        {props.alt}
      </h4>
    </div>
  )
}

Image.displayName = 'CardProject.Image'
