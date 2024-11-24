import { App } from "astal/gtk3";

type ResponseHandler = (response: string) => void;

export class MessageHandler {
  static handlers: Partial<
    Record<string, (args: string[], res: ResponseHandler) => void>
  > = {};

  static registerMessage(
    message: string,
    handler: (args: string[], response: ResponseHandler) => void,
  ) {
    MessageHandler.handlers[message] = handler;
  }

  static handleMessage(message: string, res: (response: unknown) => void) {
    const [type, ...args] = message.split(" ");

    if (!Object.keys(MessageHandler.handlers).includes(type)) {
      console.warn(`Unknown message: ${type}`);
      res(`${App.instanceName} has no handler for ${type}`);
    }

    try {
      const response = MessageHandler.handlers[type]!(args, res);
      res(response);
    } catch (error) {
      if (error instanceof Error) {
        console.warn(
          `Error handling message: ${type} ${args}: ${error.message}`,
        );
        res(`[${App.instanceName}] ${type}: ${error.message}`);
      }
    }
  }
}
