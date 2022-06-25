import FS from "fs";

export const Statistics = async (descriptor: string) => {
    return new Promise<( FS.Stats | FS.Dirent )>( (resolve) => {
        FS.stat( descriptor, (exception, statistics) => {
            if ( exception ) throw exception;
            resolve( statistics );
        } );
    } );
};
