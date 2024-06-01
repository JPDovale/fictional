import { OnProjectWithFoundationCreated } from '@modules/foundations/subscribers/OnProjectWithFoundationCreated.subscriber';
import { OnProjectWithTimelineCreated } from '@modules/timelines/subscribers/OnProjectWithTimelineCreated.subscriber';
import { container } from 'tsyringe';

// ++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.resolve(OnProjectWithFoundationCreated);

// ++++++++++++++++++++++++++++++++++++++++++
// Timelines
container.resolve(OnProjectWithTimelineCreated);
