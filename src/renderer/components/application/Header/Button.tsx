import * as HoverCard from '@radix-ui/react-hover-card'
import { Link, useLocation } from 'react-router-dom'
import { Button as ButtonDefault } from '../Button'
import { HeaderLink } from '.'

interface ButtonProps {
  link: HeaderLink
}

export function Button({ link }: ButtonProps) {
  const { pathname } = useLocation()

  return (
    <HoverCard.Root openDelay={2000}>
      <HoverCard.Trigger>
        <ButtonDefault.Root
          className="shadow-none"
          active={pathname === link.pathname}
          disabled={link.disabled}
          asChild
        >
          <Link to={link.pathname}>
            <ButtonDefault.Icon>
              <link.Icon />
            </ButtonDefault.Icon>
          </Link>
        </ButtonDefault.Root>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content className="p-2 border-[1px] border-purple900 rounded-lg max-w-xs shadow-lg bg-gray800 shadow-semiTransparentBack">
          <div>
            {link.existesTo && (
              <p className="text-xs text-justify mt-1">{link.existesTo}</p>
            )}

            {link.infos && link.infos[0] && (
              <>
                {link.infos.map(({ content, title }) => (
                  <div key={content}>
                    {title && (
                      <h2 className="font-heading text-xs font-bold opacity-95 mt-4">
                        {title}
                      </h2>
                    )}
                    {content && (
                      <p className="text-xs text-justify mt-1">{content}</p>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
          <HoverCard.Arrow className="fill-purple900" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
