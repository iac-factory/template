import FS from "fs";

import { Color }   from ".";
import { Options } from ".";

export const Writer = async (chunk: Buffer | string | string[], options?: Options, strip: boolean = false) => {
    const fn = (line: string) => {
        const prefix = options?.prefix;
        const color: Color.Colors | undefined = options?.color;
        const callable = Color?.[ color ?? "white" ];

        line = ( prefix ) ? ( ( "[" + prefix + "]" + " >>> " ) + callable( line.trim() ) )
            : line.trim();

        return line;
    };

    const buffer = chunk.toString( "utf-8", 0, chunk.length );

    chunk = buffer.split( "\n" );

    chunk.forEach( (line) => {
        ( line !== "" ) && new Promise((resolve, reject) => {
            process.stdout.write( fn(line) + "\n", "utf-8", (exception) => {
                if (exception) reject(exception);

                resolve(() => FS.fdatasyncSync(process.stdout.fd));
            } );
        });
    } );
};


export default Writer;
