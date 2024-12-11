import { App } from "astal/gtk3";
import { VariableArray } from "lib/variables";

export enum OverlayType {
  TRANSPARENT = "transparent",
  OPAQUE = "opaque",
  BLUR = "blur",
}

export const OverlayWindows: Record<OverlayType, VariableArray<string>> = {
  [OverlayType.TRANSPARENT]: VariableArray<string>([]),
  [OverlayType.OPAQUE]: VariableArray<string>([]),
  [OverlayType.BLUR]: VariableArray<string>([]),
};

export function activeOverlayWindows(type: OverlayType) {
  const names = OverlayWindows[type].get();
  return App.get_windows().filter((window) => names.includes(window.name) && window.visible);
}

export function getOverlayType(windowName: string) {
  const keys = Object.keys(OverlayWindows) as OverlayType[];
  for (const key of keys) {
    if (OverlayWindows[key].get().includes(windowName)) return key;
  }
}
