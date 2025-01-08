import { exec, execAsync } from "astal";
import { dependencies } from "utils";

interface CurlOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  data?: object;
  params?: object;
}

const DEFAULT_OPTIONS: CurlOptions = {
  method: "GET",
};

function buildCurlCommand(url: string, options: CurlOptions): string {
  if (!dependencies("curl")) throw new Error("Could not find curl on PATH");
  let command = `curl -s ${url}`;

  if (options.params && Object.keys(options.params).length > 0) {
    command += "?";
    Object.entries(options.params).forEach(([key, value], index) => {
      if (index > 0) command += "&";
      command += `${key}=${value}`;
    });
  }

  if (options.method) {
    command += ` -X ${options.method}`;
  }

  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      command += ` -H "${key}: ${value}"`;
    }
  }

  if (options.data) {
    command += ` -d '${JSON.stringify(options.data)}'`;
  }

  return command;
}

export function fetch(url: string, options: CurlOptions = DEFAULT_OPTIONS) {
  const command = buildCurlCommand(url, options);
  try {
    const result = exec(command);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching URL: ${error.message}`);
    }
  }
}

export function fetchAsync(
  url: string,
  options: CurlOptions = DEFAULT_OPTIONS,
) {
  const command = buildCurlCommand(url, options);

  try {
    const result = execAsync(command);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching URL: ${error.message}`);
    }
  }
}

type Endpoint = `/${string}`;

interface Api {
  fetch: (endpoint: Endpoint, options: CurlOptions) => string | undefined;
  fetchAsync: (
    endpoint: Endpoint,
    options: CurlOptions,
  ) => Promise<string> | undefined;
}

export function createApi(url: string): Api {
  return {
    fetch: (endpoint, options) => fetch(`${url}${endpoint}`, options),
    fetchAsync: (endpoint, options) => fetchAsync(`${url}${endpoint}`, options),
  };
}
