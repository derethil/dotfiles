import {
  CACHE_DIR,
  readFile,
  writeFile,
  exec,
} from "resource:///com/github/Aylur/ags/utils.js";
import Service from "resource:///com/github/Aylur/ags/service.js";

import options from "../options.js";
import { reloadScss } from "./scss.js";
import { setupHyprland } from "./hyprland.js";

const CACHE_FILE = `${CACHE_DIR}/options.json`;

let cacheObj = JSON.parse(readFile(CACHE_FILE) || "{}");

export interface Opt<T> {
  defaultValue: T;

  unit: string;
  title: string;
  note: string;
  category: string;
  noReload: boolean;
  persist: boolean;
  id: string;
  type: string;
  enums: string[];
  format: (value: T) => any;
  scssFormat: (value: T) => any;
}

type OptionConfig<T> = Partial<Opt<T>>;

export class Opt<T> extends Service {
  // Register the service
  static {
    Service.register(
      this,
      {},
      {
        value: ["jsobject"],
      }
    );
  }

  // Default Values

  #value;
  #scss = "";
  unit = "px";
  noReload = false;
  persist = false;
  id = "";
  title = "";
  note = "";
  type = "";
  category = "";
  enums = [] as string[];

  /**
   * @param {T} value
   * @param {OptionConfig<T> =} config
   */
  constructor(value: T, config: OptionConfig<T>) {
    super();
    this.#value = value;
    this.defaultValue = value;
    this.type = typeof value;

    if (config) Object.assign(this, config);

    import("../options.js").then(this.#init.bind(this));
  }

  // Getters & Setters

  get value() {
    return this.#value;
  }
  set value(value) {
    this.setValue(value);
  }

  set scss(scss) {
    this.#scss = scss;
  }
  get scss() {
    return this.#scss || this.id.split(".").join("-").split("_").join("-");
  }

  // Private Initializer

  #init() {
    getOptions(); // sets the ids as a side effect

    if (cacheObj[this.id] !== undefined) this.setValue(cacheObj[this.id]);

    const words = this.id
      .split(".")
      .flatMap((w) => w.split("_"))
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    this.title ||= words.join(" ");
    this.category ||= words.length === 1 ? "General" : words.at(0) || "General";

    this.connect("changed", () => {
      cacheObj[this.id] = this.value;
      writeFile(JSON.stringify(cacheObj, null, 2), CACHE_FILE);
    });
  }

  // Public Methods

  setValue(value: T, reload = false) {
    if (typeof value !== typeof this.defaultValue) {
      console.error(
        Error(
          `WrongType: Option "${this.id}" can't be set to ${value}, ` +
            `expected "${typeof this.defaultValue}", but got "${typeof value}"`
        )
      );

      return;
    }

    if (this.value !== value) {
      this.#value = this.format(value);
      this.changed("value");

      if (reload && !this.noReload) {
        reloadScss();
        setupHyprland();
      }
    }
  }

  reset(reload = false) {
    if (!this.persist) this.setValue(this.defaultValue, reload);
  }
}

/** Get all option keys */
export function getOptions(object: object = options, path = ""): Opt<any>[] {
  return Object.keys(object).flatMap((key) => {
    const obj: Opt<any> = object[key as keyof typeof object];
    const id = path ? path + "." + key : key;

    if (obj instanceof Opt) {
      obj.id = id;
      return obj;
    }

    if (typeof obj === "object") return getOptions(obj, id);

    return [];
  });
}

export function Option<T>(value: T, config: OptionConfig<T> = {}): Opt<T> {
  return new Opt(value, config);
}

/** Resets all options to their default values */
export function resetOptions() {
  exec(`rm -rf ${CACHE_FILE}`);
  cacheObj = {};
  getOptions().forEach((opt) => opt.reset());
}

/** Get all options values */
export function getValues() {
  const obj: Record<string, any> = {};
  for (const opt of getOptions()) {
    if (opt.category !== "exclude") obj[opt.id] = opt.value;
  }

  return JSON.stringify(obj, null, 2);
}

/** Apply the settings from the given config */
export function apply(config: string | object) {
  const options = getOptions();
  const settings = typeof config === "string" ? JSON.parse(config) : config;

  for (const id of Object.keys(settings)) {
    const opt = options.find((opt) => opt.id === id);
    if (!opt) {
      print(`No option with id: "${id}"`);
      continue;
    }

    opt.setValue(settings[id]);
  }
}
