import { Controller, Request } from '@shared/core/contracts/Controller';
import { PresenterProps } from '@shared/core/contracts/Presenter';
import { injectable } from 'tsyringe';
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter';
import { GetTimelineGateway } from '../gateways/GetTimeline.gateways';
import { GetTimelineService } from '../services/GetTimeline.service';
import { TimelineWithEventsPresenter } from '../presenters/TimelineWithEvents.presenter';

@injectable()
export class GetTimelineController implements Controller<PresenterProps> {
  constructor(
    private readonly getTimelineGateway: GetTimelineGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly getTimelineService: GetTimelineService,
    private readonly timelineWithEventsPresenter: TimelineWithEventsPresenter
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.getTimelineGateway.transform(_data);

    const response = await this.getTimelineService.execute(body);

    if (response.isLeft()) {
      const error = response.value;
      return this.errorPresenter.present(error);
    }

    const { timeline } = response.value;

    return this.timelineWithEventsPresenter.present(timeline);
  }
}
