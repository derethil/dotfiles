import { GObject, property, register } from "astal";

@register({ GTypeName: "DashboardState" })
export class DashboardState extends GObject.Object {
  private static instance: DashboardState;

  public static get_default(): DashboardState {
    if (!this.instance) this.instance = new DashboardState();
    return this.instance;
  }

  @property(Boolean)
  declare public reveal: boolean;

  @property(String)
  declare public page: string;
}
