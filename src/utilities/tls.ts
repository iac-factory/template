import Path    from "path";
import Process from "process";
import FS      from "fs";

import Certificates from "./tls-ca-certificates.json";

export module TLS {
    const Blob = Certificates;

    /***
     * Create TLS Certificates according to their Key-Value pair(s)
     *
     * The TLS Blob relates to AWS Base64 Encoded Certificates
     *
     * @constructor
     */
    export const Setup = () => {
        for ( const [ certificate, offset ] of Object.entries( Blob ) ) {
            const filename = [ certificate, "pem" ].join( "." );
            const target = Path.join( Process.cwd(), filename );
            const buffer = Buffer.from( offset, "base64" );

            const content = buffer.toString( "ascii" );

            FS.writeFileSync( target, content );
        }
    };

    /***
     * Remove Created *.pem File(s)
     *
     * @constructor
     */
    export const Clean = () => {
        for ( const [ certificate, offset ] of Object.entries( Blob ) ) {
            const filename = [ certificate, "pem" ].join( "." );
            const target = Path.join( process.cwd(), filename );

            FS.rmSync( target, { force: true } );
        }
    };
}

export default TLS;
