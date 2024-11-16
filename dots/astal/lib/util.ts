import { exec, execAsync } from "astal";
import notify from "./notify";

export async function bash(strings: string | string[]) {
  const command = Array.isArray(strings) ? strings.join(" ") : strings;
  try {
    return await execAsync(["bash", "-c", command]);
  } catch (err) {
    console.error(strings, err);
    return "";
  }
}

export function dependencies(...bins: string[]): boolean {
  const missing = bins.filter((bin) => {
    try {
      exec(`which ${bin}`);
      return false;
    } catch (err) {
      return true;
    }
  });

  if (missing.length > 0) {
    notify("Missing dependencies", {
      body: missing.join(", "),
      urgency: "critical",
    });
    return false;
  }

  return true;
}
