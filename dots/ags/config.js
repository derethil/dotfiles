import { readFile } from "resource:///com/github/Aylur/ags/utils.js";
import App from "resource:///com/github/Aylur/ags/app.js";
import Utils from "resource:///com/github/Aylur/ags/utils.js";

const pkgjson = JSON.parse(readFile(App.configDir + "/package.json"));

const v = {
  ags: `v${pkg.version}`,
  expected: `v${pkgjson.version}`,
};

function mismatch() {
  console.error(
    `config expects ags version ${v.expected}, but ags is ${v.ags}`
  );
  App.connect("config-parsed", (app) => app.Quit());
  return {};
}

const entry = `${App.configDir}/ts/main.ts`;
const output = "/tmp/ags/js";

async function compileAgs() {

  try {
    // prettier-ignore
    await Utils.execAsync([
      "bun", "build", entry,
      "--outdir", output,
      "--external", "resource://*",
      "--external", "gi://*",
    ]);
  } catch (error) {
    console.error(error);
    return {};
  }

  const main = await import(`file://${output}/main.js`);

  return main.default;
}

export default v.ags === v.expected ? await compileAgs() : mismatch();
