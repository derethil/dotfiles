
const pkgjson = JSON.parse(Utils.readFile(App.configDir + "/package.json"));

const v = {
  ags: pkg.version.split(".").map(Number),
  expect: pkgjson.version.split(".").map(Number),
};

function mismatch() {
  print(
    `config expects at least ags v${v.expect.join(".")}, found v${v.ags.join(".")}`
  );
  App.connect("config-parsed", (app) => app.Quit());
  return {};
}

function check() {
  if (v.ags[0] < v.expect[0]) return false;
  if (v.ags[1] < v.expect[1]) return false;
  if (v.ags[2] < v.expect[2]) return false;
  return true;
}

const output = "/tmp/ags";
const entry = `${App.configDir}/main.ts`;

try {
  await Utils.execAsync([
    "bun", "build", entry,
    "--outdir", output,
    "--external", "resource://*",
    "--external", "gi://*",
    "--external", "file://*",
  ]);
} catch (error) {
  console.error(error);
  App.quit();
}

export default check()
  ? (await import(`file://${output}/main.js`)).default
  : mismatch();
