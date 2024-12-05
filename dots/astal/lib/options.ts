import { GLib, Variable, monitorFile, readFile, writeFile } from "astal";
import { ensureDirectory } from "utils";
import { registerMessage } from "./messages";
import { TEMP } from "./session";

interface OptionProps {
  persistent?: boolean;
}

type Options = NestedRecord<string, Option> & {
  configPath: string;
  array: () => Option[];
  reset: () => Promise<string>;
  set: (id: string, value: unknown) => void;
  get: (id: string) => unknown;
  handler: (deps: string[], callback: () => void) => void;
};

const sleep = (ms = 0) => new Promise((res) => setTimeout(res, ms));

const fetchCache = (path: string): Record<string, unknown> => {
  if (!GLib.file_test(path, GLib.FileTest.EXISTS)) return {};
  return JSON.parse(readFile(path)) as Record<string, unknown>;
};

let OPTIONS: Options | undefined;

export class Option<T = unknown> extends Variable<T> {
  private readonly initial: T;
  private readonly persistent: boolean = false;

  id = "";

  constructor(initial: T, options: OptionProps = {}) {
    super(initial);
    this.initial = initial;
    this.persistent = options.persistent ?? false;
  }

  json() {
    return `option:${String(this.get())}`;
  }

  initialize(cachePath: string) {
    if (this.id === null) return;
    const cached = fetchCache(cachePath)[this.id];

    if (cached !== undefined) this.set(cached as T);

    this.subscribe(() => {
      const cache = fetchCache(cachePath);
      cache[this.id] = this.get();
      writeFile(cachePath, JSON.stringify(cache, null, 2));
    });
  }

  reset() {
    if (this.persistent) return;

    if (JSON.stringify(this.get()) !== JSON.stringify(this.initial)) {
      this.set(this.initial);
    }
    return this.id;
  }
}

export function Opt<T>(initial: T, options: OptionProps = {}) {
  return new Option(initial, options);
}

function getOptions(object: object, path = ""): Option[] {
  return Object.keys(object).flatMap((key) => {
    const option: Option = object[key as keyof object];
    const id = path ? `${path}.${key}` : key;

    if (option instanceof Option) {
      option.id = id;
      return option;
    }

    if (typeof option === "object") {
      return getOptions(option, id);
    }

    return [];
  });
}

export function constructOptions<T extends object>(cachePath: string, opts: T) {
  ensureDirectory(cachePath.split("/").slice(0, -1).join("/"));
  getOptions(opts).forEach((option) => option.initialize(cachePath));

  const configPath = `${TEMP}/config.json`;
  const values = getOptions(opts).reduce((acc, opt) => ({ [opt.id]: opt.get(), ...acc }), {});

  writeFile(configPath, JSON.stringify(values, null, 2));
  monitorFile(configPath, () => {
    const cache = fetchCache(cachePath);
    getOptions(opts).forEach((option) => {
      if (JSON.stringify(cache[option.id]) !== JSON.stringify(option.get())) {
        option.set(cache[option.id]);
      }
    });
  });

  const reset = async ([opt, ...list] = getOptions(opts), id = opt.reset()): Promise<string[]> => {
    if (!opt) return sleep().then(() => []);
    return id
      ? [id, ...(await sleep(50).then(() => reset(list)))]
      : await sleep().then(() => reset(list));
  };

  const handler = (deps: string[], callback: () => void) => {
    const options = getOptions(opts);
    options.forEach((option) => {
      if (deps.some((id) => option.id.startsWith(id))) {
        option.subscribe(callback);
      }
    });
  };

  const set = (id: string, value: unknown) => {
    let found = false;
    getOptions(opts).forEach((option) => {
      if (option.id !== id) return;
      option.set(value);
      found = true;
    });
    if (!found) throw new Error(`${id} is not a valid option`);
  };

  const get = (id: string): unknown => {
    let value: unknown;
    for (const option of getOptions(opts)) {
      if (option.id !== id) continue;
      value = option.get();
      return value;
    }
    throw new Error(`${id} is not a valid option`);
  };

  const options = Object.assign(opts, {
    configPath,
    array: () => getOptions(opts),
    reset: async () => (await reset()).join("\n"),
    set,
    get,
    handler,
  });

  OPTIONS = options as Options;

  return options;
}

registerMessage("get-option", (args) => {
  if (!OPTIONS) throw new Error("options are not yet initialized");
  if (args.length !== 1) throw new Error("expected 1 argument (id)");
  return OPTIONS.get(args[0]);
});

registerMessage("set-option", (args) => {
  if (!OPTIONS) throw new Error("options are not yet initialized");
  if (args.length !== 2) throw new Error("expected 2 arguments (id, value)");
  OPTIONS.set(args[0], args[1]);
  return "success";
});
