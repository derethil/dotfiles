export const substitutes: Record<string, string> = {
  "audio-card-analog-pci": "audio-speakers-symbolic",
  "audio-headset-analog-usb": "audio-headphones-symbolic",
};

export const icons = {
  distro: "arch-logo-symbolic",
  system: {
    updates: "package-down-symbolic",
    battery: {
      warning: "dialog-warning-symbolic",
      none: "battery-not-found-symbolic",
      charging: "battery-charging-symbolic",
      chargingFull: "battery-charging-full-symbolic",
      100: "battery-100-symbolic",
      90: "battery-90-symbolic",
      80: "battery-80-symbolic",
      70: "battery-70-symbolic",
      60: "battery-60-symbolic",
      50: "battery-50-symbolic",
      40: "battery-40-symbolic",
      30: "battery-30-symbolic",
      20: "battery-20-symbolic",
      10: "battery-critical-symbolic",
    },
    power: {
      shutdown: "system-shutdown-symbolic",
      reboot: "system-reboot-symbolic",
      suspend: "system-suspend-symbolic",
      lock: "system-lock-screen-symbolic",
      logout: "system-log-out-symbolic",
    },
  },
  media: {
    mpris: {
      playing: "media-playback-pause",
      stopped: "media-playback-start",
      next: "media-skip-forward",
      prev: "media-skip-backward",
    },
    controls: "music-symbolic",
  },
  audio: {
    microphone: {
      levels: {
        muted: "microphone-disabled-symbolic",
        low: "microphone-sensitivity-low-symbolic",
        medium: "microphone-sensitivity-medium-symbolic",
        high: "microphone-sensitivity-high-symbolic",
      },
    },
    speaker: {
      class: {
        headset: "audio-headphones-symbolic",
        tv: "audio-tv-symbolic",
        speaker: "audio-external-speaker-symbolic",
        airpods: "audio-airpods-symbolic",
      },
      levels: {
        muted: "audio-volume-muted-symbolic",
        low: "audio-volume-low-symbolic",
        medium: "audio-volume-medium-symbolic",
        high: "audio-volume-high-symbolic",
      },
    },
  },
  tools: {
    applications: "view-app-grid-symbolic",
    speaker: "audio-volume-high-symbolic",
    microphone: "microphone-sensitivity-high-symbolic",
    colorpicker: "palette-symbolic",
    screenshot: "image-symbolic",
    nudge: "eye-symbolic",
    backlight: "backlight-symbolic",
  },
  notifications: {
    base: "notification-symbolic",
    alert: "notification-alert-symbolic",
    off: "notification-disabled-symbolic",
  },
  screenshots: {
    window: "window-symbolic",
    area: "region-drag-symbolic",
    fullscreen: "full-screen-symbolic",
  },
  launchers: {
    applications: "window-new-symbolic",
    clipboard: "edit-paste-symbolic",
    projects: "document-open-symbolic",
  },
  ui: {
    overview: "view-grid",
    dot: "circle-symbolic",
    tick: "object-select-symbolic",
    refresh: "view-refresh-symbolic",
    close: "window-close-symbolic",
    themes: "preferences-desktop-theme-symbolic",
    toolbars: "toolbars-symbolic",
    settings: "emblem-system-symbolic",
    scheme: "preferences-color-symbolic",
    save: "document-save-symbolic",
    arrow: {
      "right": "pan-end-symbolic",
      "left": "pan-start-symbolic",
      "down": "pan-down-symbolic",
      "up": "pan-up-symbolic",
    },
  },
  fallback: {
    media: "audio-x-generic-symbolic",
    executable: "application-x-executable-symbolic",
    notification: "dialog-information-symbolic",
  },
};
