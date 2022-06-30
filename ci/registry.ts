import Subprocess from "child_process";

/***
 * AWS Registry Authentication
 * ---
 *
 * By default, when logging into any Docker-capable registry, successful
 * logins will store an authorization token into ~/.docker/config.
 *
 * However, AWS Tokens will expire after an extended amount of time.
 *
 * Default Development Account ID := `000000000000`
 * - An Environment's Account-ID is not private information.
 *
 * @param {string} account
 * @param region
 *
 * @see {@link https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html ECR Getting Started}
 *
 * @return { string | null } - Registry Base URL
 *
 * @example
 * /// Example Return Value upon Successful Authorization
 * >>> "0000000000000.dkr.ecr.us-east-2.amazonaws.com"
 *
 * @constructor
 */
export function Registry(account: string, region: string): string | null {
    const settings = {
        stdio: "pipe",
        encoding: "utf-8",
        cwd: process.cwd(),
        env: process.env
    } as const;

    const url = [ account, "dkr", "ecr", region, "amazonaws", "com" ].join( "." );
    const password = "aws ecr get-login-password --region us-east-2 --no-cli-auto-prompt";
    const login = [ "docker login --username AWS --password-stdin", url ].join( " " );

    /*** Generate an Authorization token for access to ECR */
    const token = Subprocess.execSync( password, { ... settings } );

    /*** Pipe the AWS Generated Authorization Token into Docker Login Command */
    const authorization = Subprocess.execSync( login, {
        input: token, ... settings
    } ).trim();

    console.log( "[Debug]", "ECR Authorization" + ":", authorization );

    return !!( authorization ) ? url : null;
}