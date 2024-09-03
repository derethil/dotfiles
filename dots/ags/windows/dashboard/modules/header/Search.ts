import { Fzf } from "fzf";
import Gdk from "gi://Gdk";
import Gtk from "gi://Gtk?version=3.0";
import { StackState, StackStateType } from "lib/stackState";
import { bash } from "lib/utils";
import { Application } from "types/service/applications";
import { DashboardOverlay } from "windows/dashboard/Dashboard";
import { SearchItem } from "./SearchItem";
import { WINDOW_NAME } from "./SearchMenu";

const Applications = await Service.import("applications");

const HYPR_SCRIPTS = await bash("realpath ~/.config/hypr/scripts");

// Base Search Class

export class Search<T = any> {
  state: StackStateType<T | null>;

  public constructor() {
    this.state = new StackState<T | null>(null);
  }

  protected handleNewState(newState: T[]) {
    this.state.setItems(newState);
    this.state.setIndex(0);
  }

  protected Wrapper(children: Gtk.Widget[]) {
    return Widget.Box({
      className: "overlay",
      hexpand: true,
      vertical: true,
      children,
    });
  }

  public handleChange(_: string): Gtk.Widget {
    throw new Error("Method not implemented.");
  }
  public onAccept() {
    throw new Error("Method not implemented.");
  }

  public handleKeyVal(keyval: number) {
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
  public constructor(active: StackStateType<string>) {
    super();
    Applications.reload();
    active.connect("changed", () => {
      if (active.value === "Applications") Applications.reload();
    });
  }

  public handleChange(query: string) {
    const results = Applications.query(query);
    this.handleNewState(results);

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
      })
    );

    return this.Wrapper(items);
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
      `find ${
        options.dashboard.projects.dynamic.value.join(" ")
      } -mindepth 1 -maxdepth 1 -type d`,
    );

    const projects = result.split("\n");
    projects.push(...options.dashboard.projects.static.value);
    this.fzf = new Fzf(projects, {
      limit: 32,
      forward: false,
    });
  }

  private async tmuxHasSession(sessionName: string) {
    const hasSession = (await bash(
      `tmux has-session -t ${sessionName}; echo $?`,
    )).trim();
    return hasSession === "0";
  }

  private async openTmuxSession(project: string) {
    const sessionName = await bash(`basename ${project} | tr -d '.'`);
    const hasSession = await this.tmuxHasSession(sessionName);

    let command: string;

    if (!hasSession) {
      command = `tmux new-session -s ${sessionName} -c ${project}`;
    } else {
      command = `tmux attach-session -t ${sessionName}`;
    }

    bash(`hyprctl dispatch exec '${HYPR_SCRIPTS}/launchfoot ${command}'`);
  }

  public handleChange(query: string) {
    const results = this.fzf.find(query).map((entry) => entry.item);
    this.handleNewState(results);

    const items = results.map((project) =>
      SearchItem<string>({
        searchState: this.state as StackStateType<string>,
        label: project,
        formatLabel: (label) => {
          const pathList = label.replace(/\/$/, "").split("/");
          return pathList.pop() ?? label;
        },
        onClick: () => {
          this.openTmuxSession(project);
          App.toggleWindow(WINDOW_NAME);
          DashboardOverlay.resetOverlay();
        },
      })
    );

    return this.Wrapper(items);
  }

  public onAccept() {
    if (this.state.items.length === 0) return;
    this.openTmuxSession(this.state.value ?? "");
  }
}

export class ClipboardSearch extends Search<string> {
  fzf: Fzf<string[]> = new Fzf([] as string[]);

  private paste(item: string) {
    Utils.execAsync([
      "bash",
      "-c",
      `echo "${item}" | cliphist decode | wl-copy`,
    ]);
  }

  public constructor(active: StackStateType<string>) {
    super();
    this.initFzf().catch(console.error);

    active.connect("changed", () => {
      if (active.value !== "Clipboard") return;
      this.initFzf().catch(console.error);
    });
  }

  public async initFzf() {
    const clipboard = await bash("cliphist list | iconv -f utf-8 -t utf-8 -c");
    const lines = clipboard.split("\n");
    this.fzf = new Fzf(lines, {
      limit: 32,
      forward: false,
    });
  }

  public handleChange(query: string) {
    const results = this.fzf.find(query).map((entry) => entry.item);
    this.handleNewState(results);

    const items = results.map((entry) =>
      SearchItem<string>({
        searchState: this.state as StackStateType<string>,
        label: entry,
        formatLabel: (label) => label.split("\t")[1],
        onClick: () => {
          this.paste(entry);
          App.toggleWindow(WINDOW_NAME);
          DashboardOverlay.resetOverlay();
        },
      })
    );

    return this.Wrapper(items);
  }

  public onAccept() {
    if (this.state.items.length === 0 || !this.state.value) return;
    this.paste(this.state.value);
  }
}
