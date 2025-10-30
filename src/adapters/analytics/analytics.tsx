import type { AmplitudeOptions } from './amplitude';
import type { ClickStreamOptions } from './clkstream';
import type { FullStoryOptions } from './fullstory';

export type AnalyticsProvider = 'AMPLITUDE' | 'FULL_STORY' | 'CLICK_STREAM';

export type AnalyticsOptions = {
  enabled: boolean;
  targets: AnalyticsProvider[];
  options?: {
    amplitude?: AmplitudeOptions;
    fullstory?: FullStoryOptions;
    clickStream?: ClickStreamOptions;
  };
};
