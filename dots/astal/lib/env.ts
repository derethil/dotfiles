import { readFile } from "astal";

class dotenv {
  env: Record<string, string> = {};

  loadDotenv(this: dotenv) {
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

  getEnv(this: dotenv, key: string): string | undefined {
    if (Object.keys(this.env).length === 0) this.loadDotenv();
    if (!this.env[key]) {
      console.error(`No env variable found for ${key}`);
      return;
    }
    return this.env[key];
  }
}

const env = new dotenv();
const loadDotenv = () => env.loadDotenv();
const getEnv = (key: string) => env.getEnv(key);

export { loadDotenv, getEnv };
