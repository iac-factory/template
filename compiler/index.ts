const FS = require("node:fs");
const OS = require("node:os");
const Path = require("node:path")
const Subprocess = require("node:child_process");

const CWD = __dirname;

module.exports = Subprocess.execSync("tsc --build", {
    env: process.env,
    cwd: Path.dirname(CWD),
    encoding: "utf-8",
    stdio: "inherit"
});