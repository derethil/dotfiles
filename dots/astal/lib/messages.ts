import { App } from "astal/gtk3";

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
