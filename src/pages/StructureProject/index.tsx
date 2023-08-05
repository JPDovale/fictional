import { useProjects } from '@store/Projects';
import { Page404 } from '@components/404';
import { SnowflakeStructure } from '@components/SnowflakeStructureComponents/SnowflakeStructure';
import { ThreeActsStructure } from './components/ThreeActsStructure';

export function StructureProjectPage() {
  const { currentProject } = useProjects((state) => ({
    currentProject: state.currentProject,
  }));

  if (currentProject?.features['multi-book']) return <Page404 />;

  if (currentProject?.structure === 'three-acts') return <ThreeActsStructure />;
  if (currentProject?.structure === 'snowflake') return <SnowflakeStructure />;

  return null;
}
