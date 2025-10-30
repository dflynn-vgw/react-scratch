export type EventProperties = Record<string, ValidPropertyType>;
export type UserProperties = Record<string, ValidPropertyType>;
export type ValidPropertyType =
  | number
  | string
  | boolean
  | Array<string | number>
  | {
      [key: string]: ValidPropertyType;
    }
  | Array<{
      [key: string]: ValidPropertyType;
    }>;

export interface AnalyticsAdapter {
  init(): Promise<void>;
  send(eventName: string, props: EventProperties): Promise<void>;
  identify(userId: string, props: UserProperties): Promise<void>;
  reset(): Promise<void>;
}
