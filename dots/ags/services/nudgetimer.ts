import GLib from "gi://GLib";
import { playNotificationBell } from "lib/utils";

const Hyprland = await Service.import("hyprland");

export enum NudgeState {
  Waiting = "waiting", // Waiting for the next nudge
  Running = "running", // Nudge is currently running
  Paused = "paused", // Nudge is paused,
  Pending = "pending", // Nudge is open and ready to run
  Disabled = "disabled", // Nudge is disabled for today
}

const { interval, duration } = options.eyenudge;

class NudgeTimerService extends Service {
  // Static
  static {
    Service.register(
      this,
      {},
      {
        "nudge-remaining": ["int", "r"],
        "nudge-state": ["string", "r"],
      },
    );
  }

  // Instance Variables

  private nudgeRemaining: number = 0;
  private nudgeState: NudgeState = NudgeState.Waiting;
  private disabledForClient: boolean = false;

  private nudgeInterval: GLib.Source | null = null;

  // Constructor

  public constructor() {
    super();
    this.waitForNudge();
    this.clientsMonitor();
  }

  // Getters

  public get nudge_remaining(): number {
    return this.nudgeRemaining;
  }

  public get nudge_state(): NudgeState {
    return this.nudgeState;
  }

  // Setters

  private set nudge_remaining(value: number) {
    this.nudgeRemaining = value;
    this.changed("nudge-remaining");
  }

  private set nudge_state(value: NudgeState) {
    this.nudgeState = value;
    this.changed("nudge-state");
  }

  // Public Methods

  public waitForNudge(minutesUntilNudge?: number) {
    this.nudge_remaining = (minutesUntilNudge ?? interval.value) * 1000;
    this.nudge_state = NudgeState.Waiting;
    this.startInterval();
  }

  public triggerNudge(nudgeLength?: number) {
    this.nudge_remaining = (nudgeLength ?? duration.value) * 1000;
    this.nudge_state = NudgeState.Pending;
    this.clearInterval();
  }

  public startNudge() {
    this.nudge_state = NudgeState.Running;
    this.startInterval();
  }

  public pauseNudge() {
    this.nudge_state = NudgeState.Paused;
    this.clearInterval();
  }

  public disableNudge() {
    this.nudge_state = NudgeState.Disabled;
    this.clearInterval();
  }

  // Private Helpers

  private shouldDisableFor(clientClass: string) {
    const disableFor = options.eyenudge.disableForClients.value;
    return disableFor.some((marker) => {
      if (typeof marker === "string") return marker === clientClass;
      return marker.test(clientClass);
    });
  }

  private checkDisableClients() {
    const classes = Hyprland.clients.map((client) => client.initialClass);
    const shouldDisable = classes.some(this.shouldDisableFor);
    const isDisabled = this.nudge_state === NudgeState.Disabled;

    if (!this.disabledForClient && (shouldDisable && !isDisabled)) {
      this.disableNudge();
    }

    if (this.disabledForClient && (!shouldDisable && isDisabled)) {
      this.waitForNudge();
    }
  }

  private clientsMonitor() {
    this.checkDisableClients();
    Hyprland.connect("notify::clients", () => this.checkDisableClients());
  }

  private clearInterval(): boolean {
    if (!this.nudgeInterval) return false;
    clearInterval(this.nudgeInterval);
    return true;
  }

  private handleZeroRemaining() {
    App.toggleWindow("eyenudge");
    switch (this.nudgeState) {
      case "waiting":
        this.triggerNudge();
        break;
      case "running":
        this.waitForNudge();
        playNotificationBell();
        break;
    }
  }

  private startInterval() {
    this.clearInterval();
    this.nudgeInterval = setInterval(() => {
      this.nudge_remaining -= 10;
      if (this.nudge_remaining < 0) this.handleZeroRemaining();
    }, 10);
  }
}

export const NudgeTimer = new NudgeTimerService();
