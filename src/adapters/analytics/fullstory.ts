import type {
  AnalyticsAdapter,
  EventProperties,
  UserProperties,
} from './types';

export type FullStoryOptions = {
  apiKey: string;
  options: object;
};

export class FullStoryAdapter implements AnalyticsAdapter {
  private readonly options: FullStoryOptions;
  private initialised = false;

  constructor(options: FullStoryOptions) {
    this.options = options;
  }

  async init(): Promise<void> {
    if (this.initialised) return;
    const { options } = this.options;
    console.log('FullStory: init()', options);
  }

  async send(name: string, props: EventProperties): Promise<void> {
    if (!this.initialised) throw Error('FullStory Adapter NOT initialised!');
    console.log('FullStory: send()', name, props);
  }

  async identify(userId: string, props: UserProperties): Promise<void> {
    if (!this.initialised) throw Error('FullStory Adapter NOT initialised!');
    console.log('FullStory: identify()', userId, props);
  }

  async reset(): Promise<void> {
    if (!this.initialised) return;
    console.log('FullStory: reset()');
  }
}
