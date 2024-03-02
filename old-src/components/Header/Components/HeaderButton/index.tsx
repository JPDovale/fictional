import { Button } from '@components/useFull/Button';
import { HeaderLink } from '@config/header/links';
import * as HoverCard from '@radix-ui/react-hover-card';
import { useRoutes } from '@store/Routes';

interface HeaderButtonProps {
  link: HeaderLink;
}

export function HeaderButton({
  link: { Icon, infos, pathname, existesTo, disabled },
}: HeaderButtonProps) {
  const { setPathname, pathname: actualPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
    pathname: state.pathname,
  }));

  return (
    <HoverCard.Root openDelay={2000}>
      <HoverCard.Trigger>
        <Button.Root
          className="shadow-none"
          size="xs"
          active={actualPathname === pathname}
          onClick={() => !disabled && setPathname(pathname)}
          disabled={disabled}
        >
          <Button.Icon>
            <Icon />
          </Button.Icon>
        </Button.Root>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content className="p-2 border-[1px] border-purple900 rounded-lg max-w-xs shadow-lg bg-gray800 shadow-semiTransparentBack">
          <div>
            {existesTo && (
              <p className="text-xs text-justify mt-1">{existesTo}</p>
            )}
            {infos && infos[0] && (
              <>
                {infos.map(({ content, title }) => (
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
  );
}
