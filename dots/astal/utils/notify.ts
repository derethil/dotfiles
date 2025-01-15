import { execAsync } from "astal";

type Urgency = "low" | "normal" | "critical";

interface NotifyOptions {
  body?: string;
  urgency?: Urgency;
  timeout?: number;
}

export function notify(message: string, options: NotifyOptions = {}) {
  const log = logger[options.urgency ?? "normal"];
  log(message, options.body);

  execAsync([
    "notify-send",
    message,
    options.body ?? "",
    `--urgency=${options.urgency ?? "normal"}`,
    `--expire-time=${options.timeout ?? 5000}`,
  ]).catch(() => console.error(`Failed to send notification for: ${message}`));
}

const logger: Record<Urgency, typeof console.log> = {
  low: console.log,
  normal: console.warn,
  critical: console.error,
};
