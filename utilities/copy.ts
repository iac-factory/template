import Utility from "util";
import FS      from "fs";
import Path    from "path";

export const Copy = async (source: string, target: string, singleton: boolean = false, debug = false) => {
    const mkdir = Utility.promisify( FS.mkdir );

    try {
        ( singleton ) || await mkdir( target, { recursive: true } );
    } catch ( exception ) {}

    ( singleton ) && FS.copyFileSync( source, target );

    ( singleton ) || FS.readdir( source, { withFileTypes: true }, (exception, files) => {
        if ( exception ) throw exception;
        for ( const element of files ) {
            const Directory = element?.isDirectory() || false;
            const File = element?.isFile() || false;

            ( Directory ) && console.log( "[Debug] [Copy] Directory", element.name );
            ( Directory ) && Copy( Path.join( source, element.name ), Path.join( target, element.name ), singleton, debug );

            ( File ) && console.log( "[Debug] [Copy] File", element.name );
            try {
                ( File ) && FS.copyFileSync( Path.join( source, element.name ), Path.join( target, element.name ) );
            } catch ( exception ) {
                // ...
            }
        }
    } );
};
