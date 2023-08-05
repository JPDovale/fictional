import { Navigation } from '@components/useFull/Navigation';
import { useProjects } from '@store/Projects';
import { NavLink } from '@config/navigation/links';
import { projectLinks } from './projectLinks';

export function ProjectNavigation() {
  const { project } = useProjects((state) => ({
    project: state.currentProject,
  }));

  function validadeLinks() {
    const finalLinks: NavLink[] = [];

    projectLinks.forEach((link) => {
      const nothing = null;
      if (!link.featureName) return finalLinks.push(link);

      if (link.featureName === 'structure') {
        const structureIsApplied = project?.features.structure;
        const multiBookIsApplied = project?.features['multi-book'];

        if (!multiBookIsApplied && structureIsApplied) {
          finalLinks.push(link);
        }

        return nothing;
      }

      if (link.featureName === 'person') {
        const personIsApplied = project?.features.person;
        const structureOfProjectIsSnowflake =
          project?.structure === 'snowflake';

        if (personIsApplied && structureOfProjectIsSnowflake) return nothing;
        if (!personIsApplied) return nothing;

        return finalLinks.push(link);
      }

      const featureInProject = project?.features[link.featureName];

      if (featureInProject) {
        return finalLinks.push(link);
      }

      return nothing;
    });

    return finalLinks;
  }

  return <Navigation navLinks={validadeLinks()} />;
}
