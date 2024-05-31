export const substitutes: Record<string, string> = {
  "audio-card-analog-pci": "audio-speakers-symbolic",
  "audio-headset-analog-usb": "audio-headset-symbolic",
};

export const icons = {
  fallback: {
    executable: "application-x-executable-symbolic",
  },

  apps: {
    apps: "view-app-grid-symbolic",
    search: "window-new-symbolic",
  },

  notifications: {
    base: "notification-symbolic",
    alert: "notificaiton-alert-symbolic",
    off: "notification-disabled-symbolic",
  },

  workspace: "",

  power: {
    shutdown: "system-shutdown-symbolic",
    reboot: "system-reboot-symbolic",
    suspend: "system-suspend-symbolic",
    lock: "system-lock-screen-symbolic",
    logout: "system-log-out-symbolic",
  },

  tools: {
    workspaces: "view-grid",
    colorPicker: "palette-symbolic",
    screenshot: "image-symbolic",
  },

  mediaControls: "music-symbolic",

  audio: {
    mic: {
      muted: "microphone-disabled-symbolic",
      low: "microphone-sensitivity-low-symbolic",
      medium: "microphone-sensitivity-medium-symbolic",
      high: "microphone-sensitivity-high-symbolic",
    },

    volume: {
      muted: "audio-volume-muted-symbolic",
      low: "audio-volume-low-symbolic",
      medium: "audio-volume-medium-symbolic",
      high: "audio-volume-high-symbolic",
    },

    type: {
      headset: "audio-headset-symbolic",
      tv: "audio-tv-symbolic",
      speaker: "audio-external-speaker-symbolic",
    },
  },

  brightness: {
    screen: "backlight-symbolic",
  },

  searches: {
    clipboard: "edit-paste-symbolic",
    projects: "document-open-symbolic",
  },

  mpris: {
    fallback: "audio-x-generic-symbolic",
    shuffle: {
      enabled: "󰒟",
      disabled: "󰒟",
    },
    loop: {
      none: "󰓦",
      track: "󰓦",
      playlist: "󰑐",
    },
    playing: "media-playback-pause",
    stopped: "media-playback-start",
    next: "media-skip-forward",
    prev: "media-skip-backward",
  },

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

  ui: {
    tick: "object-select-symbolic",
    refresh: "view-refresh-symbolic",
    close: "window-close-symbolic",
    themes: "preferences-desktop-theme-symbolic",
    toolbars: "toolbars-symbolic",
    settings: "emblem-system-symbolic",
    scheme: "preferences-color-symbolic",
    arrow: {
      "right": "pan-end-symbolic",
      "left": "pan-start-symbolic",
      "down": "pan-down-symbolic",
      "up": "pan-up-symbolic",
    },
  },
};
