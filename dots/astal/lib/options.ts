import { GLib, Variable, monitorFile, readFile, writeFile } from "astal";
import { TEMP } from "./session";
import { ensureDirectory } from "./util";

interface OptionProps {
  persistent?: boolean;
}

const sleep = (ms = 0) => new Promise((res) => setTimeout(res, ms));

const fetchCache = (path: string) => {
  if (!GLib.file_test(path, GLib.FileTest.EXISTS)) return {};
  return JSON.parse(readFile(path));
};

class Option<T = unknown> extends Variable<T> {
  private readonly initial: T;
  private readonly persistent: boolean = false;

  id: string = "";

  constructor(initial: T, options: OptionProps = {}) {
    super(initial);
    this.initial = initial;
    this.persistent = options.persistent ?? false;
  }

  json() {
    return `option:${this.get()}`;
  }

  initialize(cachePath: string) {
    if (this.id === null) return;
    const cached = fetchCache(cachePath)[this.id];

    if (cached !== undefined) this.set(cached);

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
  const values = getOptions(opts).reduce(
    (acc, opt) => ({ [opt.id]: opt.get(), ...acc }),
    {},
  );

  writeFile(configPath, JSON.stringify(values, null, 2));
  monitorFile(configPath, () => {
    const cache = fetchCache(cachePath);
    getOptions(opts).forEach((option) => {
      if (JSON.stringify(cache[option.id]) !== JSON.stringify(option.get())) {
        option.set(cache[option.id]);
      }
    });
  });

  const reset = async (
    [opt, ...list] = getOptions(opts),
    id = opt?.reset(),
  ): Promise<string[]> => {
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

  return Object.assign(opts, {
    configPath,
    array: () => getOptions(opts),
    reset: async () => (await reset()).join("\n"),
    handler,
  });
}
