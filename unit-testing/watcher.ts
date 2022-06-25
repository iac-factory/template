import { CLI } from "..";
import { Spawn } from "..";

import Chokidar from "chokidar";

/**
 * Bootstraps a chokidar watcher. Handles keyboard input & signals
 * @param {Mocha} mocha - Mocha instance
 * @param {Object} opts
 * @param {BeforeWatchRun} [opts.beforeRun] - Function to call before
 * `mocha.run()`
 * @param {string[]} [opts.watchFiles] - List of paths and patterns to watch. If
 *   not provided all files with an extension included in
 *   `fileCollectionParams.extension` are watched. See first argument of
 *   `chokidar.watch`.
 * @param {string[]} [opts.watchIgnore] - List of paths and patterns to exclude
 *   from watching. See `ignored` option of `chokidar`.
 * @param {FileCollectionOptions} opts.fileCollectParams - List of extensions to watch if `opts.watchFiles` is not given.
 * @returns {FSWatcher}
 * @ignore
 * @private
 */
const Watcher = async (pattern: string | string[], ignore: string[]) => {
    await CLI.Handler();

    const instance = Chokidar.watch( pattern, {
        ignored: ignore,
        ignoreInitial: true
    } );

    instance.on( "ready", async () => {
        console.log( "Ready" );
    } );

    instance.on( "all", async () => {
        process.env["INIT_CWD"] && process.chdir(process.env["INIT_CWD"]);


        await new Spawn( {
            application: "tsc",
            parameters: [ "--build", process.cwd() ],
            prefix: "Watcher"
        } );
    } );

    //
    // win32/nt10/11 cannot gracefully shutdown via a signal from a parent process; a
    // `SIGINT` from a parent will cause the process to immediately exit. During normal
    // course of operation, a user will type Ctrl-C and the listener will be invoked; however,
    // such becomes an issue during automated testing.
    //
    // There may be other ways to solve the specific issue, but it too will be a hack.
    //
    // Fundamentally, Windows does not support such a "feature".
    //

    if ( process.connected ) process.on( "message", (message) => {
        ( message === "SIGINT" ) && process.emit( "SIGINT" );
    } );

    process.on( "SIGINT", async () => {
        process.emit( "exit", 130 );
    } );

    process.stdin.resume();
    /// process.stdin.setEncoding( "utf8" );
    /// process.stdin.on( "data", (data: Buffer) => {
    ///     const str = data.toString().trim().toLowerCase();
    /// } );

    return instance;
};

export {};

/// ( async () => Watcher( ".", [] ) )();
