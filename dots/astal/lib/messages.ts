import { App } from "astal/gtk3";
import { options } from "options";

type ResponseHandler = (response: string) => void;

const handlers: Partial<
  Record<string, (params: string[], respond: ResponseHandler) => void>
> = {};

export function registerMessage(
  message: string,
  handler: (params: string[], respond: ResponseHandler) => void,
) {
  handlers[message] = handler;
}

export function handleMessage(message: string, respond: ResponseHandler) {
  const [type, ...params] = message.split(" ");

  if (!Object.keys(handlers).includes(type)) {
    console.warn(`Unknown message: ${type}`);
    respond(`No handler for ${type}`);
  }

  try {
    const response = handlers[type]?.(params, respond);
    respond(response ?? "success");
  } catch (error) {
    let errorMessage = `${type} ${params}`;

    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    } else {
      errorMessage += `: ${String(error)}`;
    }

    console.warn(`Error handling message: ${errorMessage}`);
    respond(`[${App.instanceName}] ${errorMessage}`);
  }
}

export function setupMessageHandlers() {
  registerMessage("toggle", (args) => {
    if (args.length !== 1) throw new Error("expected 1 argument (window name)");
    App.toggle_window(args[0]);
    return "success";
  });

  registerMessage("get-option", (args) => {
    if (!options) throw new Error("options are not yet initialized");
    if (args.length !== 1) throw new Error("expected 1 argument (id)");
    return options.get(args[0]);
  });

  registerMessage("set-option", (args) => {
    if (!options) throw new Error("options are not yet initialized");
    if (args.length !== 2) throw new Error("expected 2 arguments (id, value)");
    options.set(args[0], args[1]);
    return "success";
  });
}
