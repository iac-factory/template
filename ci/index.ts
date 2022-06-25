import Path       from "path";
import Subprocess from "child_process";
import Package from "../package.json";

const name = (Package.name.includes("@"))
    ? Package.name.split("/").pop()
    : Package.name;

Subprocess.execSync( "docker build --tag" + " " + name + " " + "--progress plain --file Dockerfile .", {
    cwd: Path.dirname( process.cwd() ),
    encoding: "utf-8",
    stdio: "inherit"
} );

export { Package };

export * from "./main";