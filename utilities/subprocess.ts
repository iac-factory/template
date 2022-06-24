import Process    from "process";
import Subprocess from "child_process";
import Color      from "./colors";

export type PWD = string | URL | undefined;
/*** The Working Directory for the Spawn'd Process - Defaults via Invocation's CWD */
export type CWD = string | URL | undefined | PWD;
/*** The Spawn'd Process Environment Variables - Defaults via Runtime's Configuration */
export type Environment = typeof process["env"];
/*** Process Buffer + Stream Type - Defaults to `"pipe"` */
export type IO = "pipe" | "ignore";
/*** Detach Runtime from Spawn Process - Defaults to `false` */
export type Detachment = false | boolean;
/*** Process Timeout (Milliseconds) - Defaults to `Infinity` */
export type Timeout = number;
/*** Spawn an Interactive Subshell for Process - Defaults to `false` */
export type Shell = false | boolean

/***
 * Spawn Options
 * ---
 * Class-Interface Spawn Wrapper
 *
 * Opinionated Defaults:
 * - Security (Disabling `shell`)
 * - Control (Buffers `stdio`)
 * - Configuration (Inherits `process.env`)
 *
 * See {@link Subprocess.ChildProcess} for Additional Details.

 * @param {Options} options
 * @param environment
 * @constructor
 *
 * @example
 * void ( async () => {
 *     const debug = ( process.argv.includes( "--debug" ) && process.argv.includes( "--spawn" ) );
 *
 *     const test = async () => {
 *         const Class = await new Spawn( {
 *             application: "echo", parameters: [
 *                 "Hello World"
 *             ], prefix: "Class"
 *         } );
 *
 *         console.log( Class );
 *
 *         const Functional = await Spawn( {
 *             application: "echo", parameters: [
 *                 "Hello World"
 *             ], prefix: "Function"
 *         } );
 *
 *         console.log(Functional);
 *     };
 *
 *     ( debug ) && await test();
 * } )();
 */
export const Spawn: Function["prototype"] & { new(options: Options, environment?: NodeJS.ProcessEnv): Promise<Subprocess.ChildProcessWithoutNullStreams & string[]> } = function (this: Function["prototype"], options: Options, environment: NodeJS.ProcessEnv = process.env): Promise<Subprocess.ChildProcessWithoutNullStreams> | Promise<string[]> {
    if ( !( ( this ) instanceof Spawn ) ) {
        return Reflect.construct( Spawn, [ options, environment ] );
    }

    const linefeed: string[] = [];

    const defaults: Options = {
        application: options.application,
        parameters: options.parameters,
        cwd: Process.cwd(),
        detached: false,
        env: environment as NodeJS.ProcessEnv ?? {} as NodeJS.ProcessEnv,
        shell: false,
        stdio: "pipe",
        timeout: 0
    } as const;

    /*** @type {{readonly detached: Detachment, readonly cwd: CWD, readonly stdio: IO, readonly shell: Shell, readonly env: Environment, readonly timeout: Timeout}} */
    const configuration = ( options ) ? { ... defaults, ... options } : defaults;

    /***
     * Interface
     * ---
     *
     * @param parameters
     * @param properties
     */
    const spawn = async function (parameters: Parameters, properties = configuration) { // Promise<string | NodeJS.ErrnoException> {
        return await new Promise( (resolve, reject) => {
            const data = Object.create( {} );

            const subprocess = Subprocess.spawn( configuration.application, parameters, properties as Subprocess.SpawnOptions );

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
                        const { prefix } = options;

                        const fn = (input: string) => Color[ options.color ?? "white" ]( input );

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

            subprocess.on( "message", (message?, handle?) => {
                /// console.log( message, handle );
            } );
        } );
    };

    async function command(): Promise<Subprocess.ChildProcessWithoutNullStreams & string[]> {
        const reference = Object.create( {} );

        reference.spawn = spawn;

        return reference.spawn( options.parameters, options );
    }

    Object.setPrototypeOf( command, this );

    return command();
};

/**
 * Application Binary Interface
 * <br>
 * @example
 * "ls"
 *
 * @example
 * "node"
 */
export type File = string;

export type Parameters = string[]

export type Construct = Function["prototype"];

export type Options = {
    /*** {@link File} */
    readonly application: File;
    /*** {@link Parameters} */
    parameters?: Parameters;
    /*** {@link Detachment} */
    readonly detached?: Detachment;
    /*** {@link CWD} */
    readonly cwd?: CWD;
    /*** {@link Environment} */
    readonly env?: Environment;
    /*** {@link Shell} */
    readonly shell?: Shell;
    /*** {@link IO} */
    readonly stdio?: IO;
    /*** {@link Timeout} */
    readonly timeout?: Timeout;

    readonly prefix?: string;
    readonly color?: Color.Colors;
}

export const Filters = {
    empty: function (input: Buffer | string[]) {
        input = input.toString( "utf-8" ).trim().split( "\n" );
        input = input.filter( (value, index, array) => {
            return !( value.trim() === "" && ( array[ index + 1 ]?.trim() === "" || !!( array[ index + 1 ] ) ) );
        } );

        return input;
    }
} as const;

export default Spawn;

void ( async () => {
    const debug = ( process.argv.includes( "--debug" ) && process.argv.includes( "--spawn" ) );

    const test = async () => {
        const Class = await new Spawn( {
            application: "echo", parameters: [
                "Hello World"
            ], prefix: "Class"
        } );

        console.log( Class );

        const Functional = await Spawn( {
            application: "echo", parameters: [
                "Hello World"
            ], prefix: "Function"
        } );

        console.log(Functional);
    };

    ( debug ) && await test();
} )();
