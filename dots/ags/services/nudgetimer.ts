import GLib from "gi://GLib";

export type NudgeState = "waiting" | "running" | "paused" | "pending";

const { interval, duration } = options.eyenudge;

class NudgeTimerClass extends Service {
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
  private nudgeState: NudgeState = "waiting";

  private nudgeInterval: GLib.Source | null = null;

  // Constructor

  public constructor() {
    super();
    this.waitForNudge();
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
    this.nudge_state = "waiting";
    this.startInterval();
  }

  public triggerNudge(nudgeLength?: number) {
    this.nudge_remaining = (nudgeLength ?? duration.value) * 1000;
    this.nudge_state = "pending";
    this.clearInterval();
  }

  public startNudge() {
    this.nudge_state = "running";
    this.startInterval();
  }

  public pauseNudge() {
    this.nudge_state = "paused";
    this.clearInterval();
  }

  // Private Helpers

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

export const NudgeTimer = new NudgeTimerClass();
