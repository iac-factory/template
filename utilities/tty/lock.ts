import TTY from "tty";

import { Cursor } from "./cursor";

const Lock = async (): Promise<true> => new Promise( async (resolve) => {
    process?.stdin?.on( "data", ($) => {
        /// CTRL + C

        /// @ts-ignore
        Buffer.from( [ 0x3 ], "hex" )
            .equals( $ ) && process?.exit( 0 );

        /// CTRL + D

        /// @ts-ignore
        Buffer.from( [ 0x4 ], "hex" )
            .equals( $ ) && process?.exit( 0 );

        /// CTRL + Z

        /// @ts-ignore
        Buffer.from( [ 0x1a ], "hex" )
            .equals( $ ) && process?.exit( 0 );
    } );

    process?.on( "exit", async () => Cursor.show() );

    resolve( true );
} );

const Handler = async (): Promise<void> => new Promise( async (resolve) => {
    const tty = TTY.isatty( process?.stdout?.fd );

    ( tty ) && await Lock();

    resolve();
} );

export { Handler };

export default Handler;
