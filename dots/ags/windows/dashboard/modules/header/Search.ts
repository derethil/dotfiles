import Gdk from "gi://Gdk";
import Gtk from "gi://Gtk?version=3.0";
import { Fzf } from "fzf";
import { StackState, StackStateType } from "lib/stackState";
import { bash } from "lib/utils";
import { Application } from "types/service/applications";
import { SearchItem } from "./SearchItem";
import { DashboardOverlay } from "windows/dashboard/Dashboard";
import { WINDOW_NAME } from "./SearchMenu";

const Applications = await Service.import("applications");

// Base Search Class

export class Search<T = any> {
  state: StackStateType<T | null>;

  public constructor() {
    this.state = new StackState<T | null>(null);
  }

  handleChange(query: string): Gtk.Widget {
    throw new Error("Method not implemented.");
  }
  onAccept() {
    throw new Error("Method not implemented.");
  }

  handleKeyVal(keyval: number) {
    if (this.state.items.length === 0) return;

    switch (keyval) {
      case Gdk.KEY_n:
      case Gdk.KEY_Tab:
        this.state.next();
        break;
      case Gdk.KEY_p:
        this.state.prev();
        break;
      case Gdk.KEY_0:
        this.state.setIndex(0);
        break;
    }
  }
}

// Search Classes

export class ApplicationSearch extends Search<Application> {
  public handleChange(query: string) {
    const results = Applications.query(query);

    this.state.setItems(results);
    this.state.setIndex(0);

    const items = results.map((app) =>
      SearchItem<Application | null>({
        label: app.name,
        icon: app.icon_name,
        searchState: this.state,
        selector: (state) => state.value?.name ?? "",
        onClick: () => {
          app.launch();
          App.toggleWindow(WINDOW_NAME);
          DashboardOverlay.resetOverlay();
        },
      }),
    );

    return Widget.Box({
      className: "overlay",
      hexpand: true,
      vertical: true,
      children: items,
    });
  }

  public onAccept() {
    if (this.state.items.length === 0) return;
    this.state.value?.launch();
  }
}

export class ProjectsSearch extends Search<string> {
  fzf: Fzf<string[]> = new Fzf([] as string[]);

  public constructor() {
    super();
    this.initFzf().catch(console.error);
  }

  private async initFzf() {
    const result = await bash(
      `find ${options.dashboard.projects.dynamic.value.join(" ")} -mindepth 1 -maxdepth 1 -type d`,
    );

    const projects = result.split("\n");
    projects.push(...options.dashboard.projects.static.value);
    this.fzf = new Fzf(projects, {
      limit: 32,
      forward: false,
    });
  }

  public handleChange(query: string) {
    const results = this.fzf.find(query).map((entry) => entry.item);

    this.state.setItems(results);
    this.state.setIndex(0);

    const items = results.map((project) =>
      SearchItem<string>({
        searchState: this.state as StackStateType<string>,
        label: project,
        formatLabel: (label) => {
          const pathList = label.replace(/\/$/, "").split("/");
          return pathList.pop() ?? label;
        },
        onClick: () => {
          bash(`code -r ${project}`);
          App.toggleWindow(WINDOW_NAME);
          DashboardOverlay.resetOverlay();
        },
      }),
    );

    return Widget.Box({
      className: "overlay",
      hexpand: true,
      vertical: true,
      children: items,
    });
  }

  public onAccept() {
    if (this.state.items.length === 0) return;
    bash(`code -r ${this.state.value}`);
  }
}
