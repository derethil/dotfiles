type HueResponse<T = unknown> = [
  {
    success: Record<string, T>;
  },
];

// Lights

interface HueLight {
  state: {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: string;
    xy: [number, number];
    ct: number;
    alert: string;
    colormode: string;
    reachable: boolean;
  };
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  uniqueid: string;
  swversion: string;
}

type HueLights = Record<string, HueLight>;

// Groups

interface HueGroupState {
  all_on: boolean;
  any_on: boolean;
}

interface HueGroupAction {
  on: boolean;
  bri: number;
  alert: string;
}

interface HueGroup {
  name: string;
  lights: string[];
  sensors: string[];
  type: string;
  state: HueGroupState;
  recycle: boolean;
  class: string;
  action: HueGroupAction;
}

type HueGroups = Record<string, HueGroup>;
