import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from 'src/renderer/utils/cn'
import { tv } from 'tailwind-variants'
import { Theme } from '@rStores/useInterfaceStore'
import { useTheme } from '@rHooks/useTheme'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const avatarFallbackStyles = tv({
  base: 'flex h-full w-full items-center border justify-center rounded-full bg-muted',
  variants: {
    theme: {
      [Theme.DARK]: 'bg-gray200 border-purple900',
      [Theme.LIGHT]: 'bg-gray800 border-purple200',
      [Theme.SYSTEM]: '',
    },
  },
})

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => {
  const { theme } = useTheme()

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={avatarFallbackStyles({ theme, className })}
      {...props}
    />
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
