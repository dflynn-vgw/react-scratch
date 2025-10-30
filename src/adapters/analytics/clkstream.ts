import type {
  AnalyticsAdapter,
  EventProperties,
  UserProperties,
} from './types';

export type ClickStreamOptions = {
  apiKey: string;
  options: object;
};

export class ClickStreamAdapter implements AnalyticsAdapter {
  private readonly options: ClickStreamOptions;
  private initialised = false;

  constructor(options: ClickStreamOptions) {
    this.options = options;
  }

  async init(): Promise<void> {
    if (this.initialised) return;
    const { options } = this.options;
    console.log('ClickStream: init()', options);
  }

  async send(name: string, props: EventProperties): Promise<void> {
    if (!this.initialised) throw Error('ClickStream Adapter NOT initialised!');
    console.log('ClickStream: send()', name, props);
  }

  async identify(userId: string, props: UserProperties): Promise<void> {
    if (!this.initialised) throw Error('ClickStream Adapter NOT initialised!');
    console.log('ClickStream: identify()', userId, props);
  }

  async reset(): Promise<void> {
    if (!this.initialised) return;
    console.log('ClickStream: reset()');
  }
}
