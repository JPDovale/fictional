import { Feature } from '@modules/Projects/models/Project/valueObjects/Features';
import { LucideIcon } from 'lucide-react';

export interface NavLink {
  pathname: string;
  Icon: LucideIcon;
  label: string;
  featureName?: Feature;
}
