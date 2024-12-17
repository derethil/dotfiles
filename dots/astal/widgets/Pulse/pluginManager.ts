import { bind, GObject, property, register, Variable } from "astal";
import { PulseResult } from "./elements/PulseResult";
import { PulseState } from "./state";
import { PulsePlugin, StaticPulsePlugin } from "./types";

@register({ GTypeName: "PulsePluginManager" })
export class PluginManager extends GObject.Object {
  // Static Logic

  static instance: PluginManager;
  private state: PulseState;

  static get_default(state: PulseState) {
    if (!this.instance) this.instance = new PluginManager(state);
    return this.instance;
  }

  // Constructor

  constructor(state: PulseState) {
    // @ts-expect-error - GObject not typed for Astal subclasses
    super({ focused: 0, results: { widgets: [] } });
    this.state = state;
    this.bindResultsToQuery();
    this.bindFocusedState();
  }

  // Properties

  private _focused = 0;
  private plugins: PulsePlugin[] = [];

  @property(Object)
  declare public results: { widgets: PulseResult[] };

  // Getters / Setters

  @property(Number)
  get focused() {
    return this._focused;
  }

  set focused(index: number) {
    if (index === this._focused) return;
    if (this.results === null) return;
    this._focused = Math.max(0, Math.min(this.results.widgets.length - 1, index));
    this.notify("focused");
  }

  public get commands() {
    return this.plugins.map((plugin) => plugin.command);
  }
  // Methods

  private bindResultsToQuery() {
    bind(this.state, "parsed").subscribe(({ command, args }) => {
      const plugin = this.plugins.find((plugin) => plugin.command === command);
      const plugins = plugin ? [plugin] : this.plugins;
      this.results.widgets = plugins.flatMap((plugin) => plugin.process(args));
      this.focused = 0;
      this.notify("results");
    });
  }

  private bindFocusedState() {
    Variable.derive([bind(this, "focused"), bind(this, "results")], (index, results) => {
      if (!results || results.widgets.length === 0) return;
      results.widgets.forEach((widget) => widget.focused.set(false));
      results.widgets[index].focused.set(true);
      this.results = results;
    });
  }

  public registerPlugin(plugin: StaticPulsePlugin) {
    const command = plugin.get_default().command;
    if (!this.commands.includes(command)) this.plugins.push(plugin.get_default());
  }

  public handleActivate() {
    const focused = this.results.widgets[this.focused];
    if (!focused) return;
    console.log(focused);
    focused.onActivate();
  }
}
