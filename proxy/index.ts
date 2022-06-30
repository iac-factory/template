import Dot        from "dotenv";
import Path       from "path";
import Subprocess from "child_process";

/***
 * Relative to Where the User Started the Runtime Process, Assume
 * there's a Local `.env`.
 *
 * @return {boolean}
 *
 * @constructor
 */
const Hydrate = (): boolean => {
    Dot.config({
        path: Path.join(process.cwd(), ".env"),
        /*** Help Debug why Keys or Values are not as perhaps Expected - Only Logs upon Parse Conflicts */
        /// debug: true,
        /*** Ensure Overrides of Relative .env Overwrite System's *.env */
        override: true,
        /*** IMHO, Never should Production Passwords, Tokens, or Secrets be Encoded with Emoji-Capable Characters (UTF-8) */
        encoding: "ascii"
    });

    /*** Return Boolean for Chainable Calls */
    return true;
}

const Setup = async () => {
    const { spawn } = Subprocess;

    /// const proxy = [ process.env[ "LOCAL_PORT" ], process.env[ "DATABASE_HOSTNAME" ], process.env[ "DATABASE_PORT" ] ].join( ":" );
    /// const proxy = [ process.env[ "" ], process.env[ "MYSQL_HOSTNAME" ], process.env[ "MYSQL_PORT" ] ].join( ":" );
    /// const proxy = [ process.env[ "DOCUMENTDB_PORT" ], process.env[ "DOCUMENTDB_HOSTNAME" ], process.env[ "DOCUMENTDB_PORT" ] ].join( ":" );
    const proxy = [ process.env[ "REDIS_PORT" ], process.env[ "REDIS_HOSTNAME" ], process.env[ "REDIS_PORT" ] ].join( ":" );
    const bastion = [ process.env[ "BASTION_USERNAME" ], process.env[ "BASTION_HOSTNAME" ] ].join( "@" );

    /*** Strictly-Typed SSH Tunnel + Reverse Port-Forward Proxy Command */
    const parameters: Readonly<[ "-L", string, string, "-i", string, "-N" ]> = [ "-L", proxy, bastion, "-i", process.env[ "BASTION_KEY" ]!, "-N" ];

    console.debug("[Debug] [Controller (Cluster)]", ["ssh", ... parameters], "\n");
    const subprocess = spawn( "ssh", parameters, {
        shell: false, stdio: "ignore", detached: true
        /// shell: true, stdio: "inherit", detached: false
    } );

    /***
     * By default, the parent will wait for the detached child to exit. To
     * prevent the parent from waiting for a given subprocess to exit, use
     * the subprocess.unref() method. Doing so will cause the parent's event
     * loop to not include the child in its reference count, allowing the
     * parent to exit independently of the child, unless there is an established
     * IPC channel between the child and the parent.
     */

    /*** *.unref() for Detachment (Useful for Tunnel-Required Runtimes */
    subprocess.unref();

    /*** Ensure Open Tunnel(s) are Removed */
    process.on( "exit", () => {
        subprocess.kill( "SIGTERM" );
    } );

    return await new Promise<Subprocess.ChildProcess>( (resolve) => {
        /*** Event Listener - Safe Mutex-Unlock */
        subprocess.on( "spawn", async () => {
            resolve( subprocess );
        } );
    } );
};

(async () => Hydrate() && Setup())();

/*** Purposefully Prevent Export(s) */
export {}