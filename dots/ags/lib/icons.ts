export const substitutes: Record<string, string> = {
  "audio-card-analog-pci": "audio-speakers-symbolic",
  "audio-headset-analog-usb": "audio-headset-symbolic",
};

export const icons = {
  fallback: {
    executable: "application-x-executable-symbolic",
  },

  workspace: "",

  powermenu: {
    shutdown: "",
    reboot: "",
    suspend: "",
    lock: "",
    logout: "",
  },

  tools: {
    colorPicker: "",
    screenshot: "",
  },

  clock: "",

  tray: "󱊗",

  mediaControls: "",

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
    screen: "display-brightness-symbolic",
  },

  searches: {
    applications: "window-new-symbolic",
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
    playing: "",
    paused: "",
    stopped: "",
    next: "",
    prev: "",
  },

  battery: {
    warning: "dialog-warning-symbolic",
    none: "󱉝",
    charging: "󰂄",
    chargingFull: "󱟢",
    100: "󰁹",
    90: "󰂂",
    80: "󰂁",
    70: "󰂀",
    60: "󰁿",
    50: "󰁾",
    40: "󰁽",
    30: "󰁼",
    20: "󰁻",
    10: "󰂃",
  },

  ui: {
    tick: "object-select-symbolic",
    refresh: "view-refresh-symbolic",
    close: "window-close-symbolic",
    arrow: {
      "right": "pan-end-symbolic",
      "left": "pan-start-symbolic",
      "down": "pan-down-symbolic",
      "up": "pan-up-symbolic",
    },
  },
};
