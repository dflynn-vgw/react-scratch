import type {
  AnalyticsAdapter,
  EventProperties,
  UserProperties,
} from './types';
import * as amplitude from '@amplitude/analytics-browser';

export type AmplitudeOptions = {
  apiKey: string;
  options: object;
};

export class AmplitudeAdapter implements AnalyticsAdapter {
  private readonly options: AmplitudeOptions;
  private initialised = false;

  constructor(options: AmplitudeOptions) {
    this.options = options;
  }

  async init(): Promise<void> {
    if (this.initialised) return;
    const { apiKey, options } = this.options;
    amplitude.init(apiKey, options);
    console.log('Amplitude: init()', options);
  }

  async send(name: string, props: EventProperties): Promise<void> {
    if (!this.initialised) throw Error('Amplitude Adapter NOT initialised!');
    amplitude.track(name, props);
    console.log('Amplitude: send()', name, props);
  }

  async identify(userId: string, props: UserProperties): Promise<void> {
    if (!this.initialised) throw Error('Amplitude Adapter NOT initialised!');

    amplitude.setUserId(userId);
    const identifyEvent = new amplitude.Identify();
    Object.entries(props).forEach(([key, value]) => {
      identifyEvent.set(key, value);
    });
    amplitude.identify(identifyEvent);
    console.log('Amplitude: identify()', userId, props);
  }

  async reset(): Promise<void> {
    if (!this.initialised) return;
    amplitude.reset();
    console.log('Amplitude: reset()');
  }
}
