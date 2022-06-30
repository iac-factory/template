import FS from "fs";
import Path from "path";

import Subprocess from "child_process";

const CWD = Path.dirname( import.meta.url.replace( "file://", "" ) );

const Name = () => {
    const Package = JSON.parse( FS.readFileSync( "../package.json", { encoding: "utf-8" } ) );
    return ( Package.name.includes( "@" ) )
        ? Package.name.split( "/" ).pop()
        : Package.name;
};

const Filters = {
    /*** Eliminates Useless Output */
    empty: function (input: Buffer | string[]) {
        input = input.toString( "utf-8" ).trim().split( "\n" );
        input = input.filter( (value, index, array) => {
            return !( value.trim() === "" && ( array[ index + 1 ]?.trim() === "" || !!( array[ index + 1 ] ) ) );
        } );

        return input;
    }
};

/*** Build Docker Container for Developers in Local Development */
await new Promise( (resolve, reject) => {
    const linefeed: string[] = [];

    const data = Object.create( {} );

    const subprocess = Subprocess.spawn( "docker", [ "build", "--tag", ( Name() as string ), "--progress", "plain", "--file", "Dockerfile", "../." ], {
        cwd: CWD, shell: true, env: process.env, stdio: "inherit"
    } );

    subprocess.on( "error", (error) => {
        reject( [ error, data ] );
    } );

    /***
     * Output often contains more than a single empty line to use as separation contexts.
     *
     * The following filter aims to eliminate useless output; consecutive empty lines are limited to
     * a single line.
     */
    subprocess?.stdout?.on( "data", async (output: Buffer | string[]) => {
        output = Filters.empty( output );

        for await ( const line of output ) {
            linefeed.push( line );

            void await new Promise( (resolve) => {
                const { prefix } = { prefix: "Test" };

                const fn = (input: string) => ( input );

                process.stdout.write( ( prefix )
                        ? ( ( "[" + prefix + "]" + " " ) + fn( line.trim() ) + "\n" )
                        : ( fn( line.trim() ) + "\n" ),
                    (exception) => {
                        if ( exception ) throw exception;

                        resolve( null );
                    }
                );
            } );
        }
    } );

    subprocess?.stderr?.on( "data", (output: Buffer) => {
        data.error += ( output.toString( "utf-8" ) ).trim();
    } );

    subprocess.on( "close", (code: number) => {
        ( code === 0 ) || reject( data );

        resolve( linefeed );
    } );

    /*** Occasionally Useful Event Listener - Typically in Process Clustering + IPC */
    subprocess.on( "message", (message?, handle?) => {
        /// console.log( message, handle );
    } );

    process.on( "exit", () => {
        subprocess.kill( 0 );
    } );
} );

export * from "./main.js";