import type { Color } from ".";

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

/**
 * The System Executable
 * ---
 *
 * Application Binary Interface
 *
 * <br>
 * @example
 * "ls"
 *
 * @example
 * "node"
 */
export type Executable = string;

/*** Application {@link Executable} Input Parameter(s) or Flag(s) */
export type Parameters = string[]

export type Options = {
    /*** {@link File} */
    readonly application: Executable;
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
