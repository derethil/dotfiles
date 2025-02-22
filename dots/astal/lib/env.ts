import { readFile } from "astal";

class Env {
  env: Record<string, string> = {};

  loadEnv(this: Env) {
    const contents = readFile(`${SRC}/.env`);

    if (contents === "") {
      console.error("no .env file found");
      return;
    }

    const lines = contents.split("\n");

    const loaded = lines.reduce<Record<string, string>>((acc, line) => {
      const [key, value] = line.split("=");
      acc[key] = value;
      return acc;
    }, {});

    this.env = loaded;
  }

  getEnv(this: Env, key: string): string | undefined {
    if (Object.keys(this.env).length === 0) this.loadEnv();
    if (!this.env[key]) {
      console.error(`No env variable found for ${key}`);
      return;
    }
    return this.env[key];
  }
}

const env = new Env();
const loadEnv = () => env.loadEnv();
const getEnv = (key: string) => env.getEnv(key);

export { loadEnv, getEnv };
