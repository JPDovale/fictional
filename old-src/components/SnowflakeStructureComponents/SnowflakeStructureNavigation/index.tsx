import * as Tabs from '@radix-ui/react-tabs';
import * as Avatar from '@radix-ui/react-avatar';
import { Snowflake } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '@hooks/useTheme';
import { useProjects } from '@store/Projects';
import { useInterface } from '@store/Interface';
import { avatarImageStyles, avatarStyles, personNavStyles } from './styles';
import { AboutButtonTrigger } from './components/AboutButtonTrigger';
import { EditorButtonTrigger } from './components/EditorButtonTrigger';
import { AboutContent } from './components/AboutContent';
import { EditorContent } from './components/EditorContent';

export function SnowflakeStructureNavigate() {
  const { sideBarIsOpen, setSideBarIsOpen } = useInterface((state) => ({
    sideBarIsOpen: state.sideBarIsOpen,
    setSideBarIsOpen: state.setSidBarIsOpen,
  }));
  const [isToShowContent, setIsToShowContent] = useState(false);

  const { project } = useProjects((state) => ({
    project: state.currentProject,
  }));
  const { theme } = useTheme();

  function handleChangeTab(tab: string) {
    const tabIsOpem = tab !== 'editor';

    if (!tabIsOpem) {
      setIsToShowContent(false);
    }

    setSideBarIsOpen(tabIsOpem);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!sideBarIsOpen) {
      setIsToShowContent(false);
    }

    if (sideBarIsOpen) {
      timeoutId = setTimeout(() => {
        setIsToShowContent(true);
      }, 335);
    }

    return () => clearTimeout(timeoutId);
  }, [sideBarIsOpen]);

  return (
    <>
      <div className={personNavStyles({ isOpen: sideBarIsOpen, theme })}>
        <Tabs.Root
          value={sideBarIsOpen ? 'projectStructure' : 'editor'}
          onValueChange={(e) => handleChangeTab(e)}
        >
          <Tabs.List className="flex justify-between gap-4 p-2 pb-3 border-b border-b-base900">
            <AboutButtonTrigger sideBarIsOpen={sideBarIsOpen} />
            <EditorButtonTrigger isToShowContent={isToShowContent} />
          </Tabs.List>

          <Avatar.Root className={avatarStyles({ isOpen: sideBarIsOpen })}>
            <Avatar.Image
              className={avatarImageStyles({ isOpen: sideBarIsOpen })}
              src={project?.image.url ?? undefined}
              alt={project?.image.alt}
            />
            <Avatar.Fallback>
              <Snowflake
                data-open={sideBarIsOpen}
                className="w-8 h-8 data-[open=false]:w-4 data-[open=false]:h-4 fill-purple800 ease-in-out duration-300"
              />
            </Avatar.Fallback>
          </Avatar.Root>

          <AboutContent isToShowContent={isToShowContent} project={project} />
          <EditorContent project={project} />
        </Tabs.Root>
      </div>
      <div
        data-open={sideBarIsOpen}
        className="min-w-[16rem] max-w-[16rem] w-full data-[open=false]:min-w-[3.5rem] data-[open=false]:max-w-[3.5rem] ease-in-out duration-300"
      />
    </>
  );
}
