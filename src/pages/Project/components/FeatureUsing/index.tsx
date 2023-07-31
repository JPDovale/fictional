import {
  Feature,
  ObjectFeatures,
} from '@modules/Projects/models/Project/valueObjects/Features';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '@hooks/useTheme';
import { featureUsingStyles } from './styles';

interface FeatureUsingProps {
  feature: Feature;
  features: ObjectFeatures;
  Icon: LucideIcon;
  name: string;
}

export function FeatureUsing({
  feature,
  features,
  Icon,
  name,
}: FeatureUsingProps) {
  const { theme } = useTheme();
  if (!features[feature]) return null;

  return (
    <div className={featureUsingStyles({ theme })}>
      <Icon className="fill-purple900 w-8 h-8" />
      <span className="text-sm uppercase font-bold text-center opacity-70">
        {name}
      </span>
    </div>
  );
}
