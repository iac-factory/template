import * as FS      from "fs";
import * as Path    from "path";

export module Reader {
    /***
     *
     * @param {string} location
     * @param {(FS.Stats & {name?: string}) | (FS.Dirent & {name?: string})} file
     * @param {string} destination
     * @return {Reader.Descriptor}
     * @private
     */
    function schema(location?: string, file?: ( FS.Stats | FS.Dirent ) & { name?: string }, destination?: string): Descriptor {
        const canonical = ( location || file ) ? Path.resolve( location!, file!.name! ) : Path.resolve( location! );

        return {
            name: Path.basename( canonical ),
            path: canonical,
            destination: destination ?? null,
            properties: {
                file: file?.isFile() ?? false,
                directory: file?.isDirectory() ?? false,
                socket: file?.isSocket() ?? false,
                symbolic: file?.isSymbolicLink() ?? false
            }
        };
    }

    /***
     * Scan a Directory - Evaluate for Recursive Scanning, or Return a File
     * Type according to Schema
     *
     * @see {@link schema}
     *
     * @param {string} source
     * @param {Reader.Descriptor[]} collection
     * @return {Reader.Descriptor[]}
     */
    export const scan = (source: string, collection?: Descriptor[]) => {
        const reference = (collection) ? collection : [];

        const descriptors = FS.readdirSync( source, { withFileTypes: true });

        for (const descriptor of descriptors) {
            const Directory = descriptor?.isDirectory() || false;

            const Link = descriptor?.isSymbolicLink() || false;
            const Socket = descriptor?.isSocket() || false;
            const File = descriptor?.isFile() || false;

            ( Directory ) && console.log( "[Debug] [Read] Directory", descriptor.name );
            ( Directory ) && reference.push( schema( source, descriptor ) );
            ( Directory ) && Reader.scan( Path.join( source, descriptor.name ), reference);

            ( Socket ) && console.log( "[Debug] [Read] Socket", descriptor.name );
            ( Socket ) && reference.push( schema( source, descriptor ) );

            ( Link ) && console.log( "[Debug] [Read] Symbolic Link", descriptor.name );
            ( Link ) && reference.push( schema( source, descriptor ) );

            ( File ) && console.log( "[Debug] [Read] File", descriptor.name );
            ( File ) && reference.push( schema( source, descriptor ) );
        }

        return reference;
    };

    export type Property = {
        readonly file: boolean,
        readonly directory: boolean,
        readonly socket: boolean,
        readonly symbolic: boolean
    };

    export type Descriptor = {
        readonly name: string,
        readonly path: string,
        readonly properties: Property,
        readonly destination: string | null
    };
}

export const Abstract: Function["prototype"] & { new(): void } = function (this: Function["prototype"]) {
    if (!(this instanceof Abstract)) return new Abstract();

    this.prototype = Function;
    this.prototype.constructor = Abstract;
}

Abstract.prototype.chain = function () {
    console.log("Chain ...");

    return new Abstract();
}

void ( async () => {
    /*** $ node ${0} --debug */
    const debug = ( process.argv.includes( "--reader" ) );

    const test = async () => {
        const implementation = new Abstract();

        implementation.chain().chain().chain();

        const reader = Reader.scan(Path.join(process.cwd(), ".."));

        console.log(reader);

        return void null;
    };

    ( debug ) && await test();
} )();
