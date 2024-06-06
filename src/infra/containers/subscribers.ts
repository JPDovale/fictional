import { OnProjectWithFoundationCreated } from '@modules/foundations/subscribers/OnProjectWithFoundationCreated.subscriber';
import { OnPersonInfosUsedInEventsUpdated } from '@modules/timelines/subscribers/OnPersonInfosUsedInEventsUpdated.subscriber';
import { OnPersonWithTimelineEventsCreated } from '@modules/timelines/subscribers/OnPersonWithTimelineEventsCreated.subscriber';
import { OnProjectWithTimelineCreated } from '@modules/timelines/subscribers/OnProjectWithTimelineCreated.subscriber';
import { container } from 'tsyringe';

// ++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.resolve(OnProjectWithFoundationCreated);

// ++++++++++++++++++++++++++++++++++++++++++
// Timelines
container.resolve(OnProjectWithTimelineCreated);
container.resolve(OnPersonWithTimelineEventsCreated);
container.resolve(OnPersonInfosUsedInEventsUpdated);
