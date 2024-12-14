import { Variable } from "astal";
import { Widget } from "astal/gtk3";

export const END_ADORNMENT_TRANSITION_DURATION = 200;

export class PulseState {
  static instance: PulseState;

  declare public query: Variable<string>;
  declare public startIcon: Variable<string>;

  declare private endWidget: Variable<Widget.Box | null>;
  declare private showEndWidget: Variable<boolean>;

  static get_default() {
    if (!this.instance) this.instance = new PulseState();
    return this.instance;
  }

  constructor() {
    this.query = Variable("");
    this.startIcon = Variable("system-search");

    this.endWidget = Variable<Widget.Box | null>(null);
    this.showEndWidget = Variable(false);
    this.handleChangeEndWidget();
  }

  private handleChangeEndWidget() {
    this.showEndWidget.subscribe((shown) => {
      if (shown) return;
      setTimeout(() => this.endWidget.set(null), END_ADORNMENT_TRANSITION_DURATION);
    });

    this.endWidget.subscribe((widget) => {
      if (widget === null) return;
      this.showEndWidget.set(true);
    });
  }

  public setEndWidget(widget: Widget.Box | null) {
    if (widget === null) {
      this.showEndWidget.set(false);
    } else {
      this.endWidget.set(widget);
    }
  }

  public get end() {
    return this.endWidget();
  }

  public get endShown() {
    return this.showEndWidget();
  }
}
