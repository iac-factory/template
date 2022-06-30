import FS from "fs";
import Utility from "util";

/*** Although Rare, Terraform State can be Disregarded */
const Clean = async () => {
    const reader = Utility.promisify(FS.readdir);

    const files = await reader(process.cwd());
    for await (const file of files) {
        (file.includes("tfstate")) && FS.rm(file, { recursive: true, force: true }, (exception) => {
            if (exception) throw exception;
        });

        (file.includes("cdktf.out")) && FS.rm(file, { recursive: true, force: true }, (exception) => {
            if (exception) throw exception;
        });
    }
}

await (async () => Clean())();
