import OS   from "os";
import FS   from "fs";
import Path from "path";

import Mongoose from "mongoose";

import Certificate from "./us-east-2-bundle.json";

FS.writeFileSync( Path.join( __dirname, "us-east-2-bundle.pem" ), Certificate.Chain );

/***
 *
 * @constructor
 */
const URI = () => {
    switch ( OS.platform() ) {
        case "darwin": {
            /*** Development Runtime or Local Workload */
            return process.env[ "DOCUMENTDB_URI" ] as string;
        }
        case "linux": {
            /*** Container Runtime */
            return process.env[ "OVERRIDE_DOCUMENTDB_URI" ] as string;
        }
        case "win32": {
            /*** Development Runtime or Local Workload */
            return process.env[ "DOCUMENTDB_URI" ] as string;
        }
        case "openbsd": {
            /*** Development Runtime or Local Workload */
            return process.env[ "DOCUMENTDB_URI" ] as string;
        }
        default: {
            throw new Error("Unsupported Operating System");
        }
    }
};

export module Context {
    const state: { connection: null | any } = { connection: null };
    const settings: {
        lock: boolean,
        data: object,
        options: object,
        client?: import("mongodb").MongoClient
    } = {
        lock: false,
        data: Object.create( {} ),
        options: Object.create( {} )
    };

    export enum Compression {
        "$0" = 0,
        "$1" = 1,
        "$2" = 2,
        "$3" = 3,
        "$4" = 4,
        "$5" = 5,
        "$6" = 6,
        "$7" = 7,
        "$8" = 8,
        "$9" = 9,
    }

    export type Level = keyof typeof Compression;
    export const Handler = async function (connection?: string) {
        const uri = ( connection ) ? connection : "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000"

        console.log(uri);

        if ( state.connection == null ) {
            state.connection = Mongoose.connect( uri, {
                dbName: "Authentication",
                directConnection: true,
                user: ( process.env[ "DOCUMENTDB_ENABLE_AUTH" ] === "true" ) ? process.env[ "DOCUMENTDB_USERNAME" ] : undefined,
                pass: ( process.env[ "DOCUMENTDB_ENABLE_AUTH" ] === "true" ) ? process.env[ "DOCUMENTDB_PASSWORD" ] : undefined,
                serverSelectionTimeoutMS: 5000,
                retryWrites: false,
                tlsAllowInvalidHostnames: true,
                tlsAllowInvalidCertificates: true,
                tls: ( process.env[ "DOCUMENTDB_ENABLE_TLS" ] === "true" ),
                tlsCAFile: ( process.env[ "DOCUMENTDB_ENABLE_TLS" ] === "true" ) ? Path.join( __dirname, "us-east-2-bundle.pem" ) : undefined,
            } ).then( () => Mongoose );

            await state.connection;
        }

        return state.connection;
    };

    export const Connection = async function (): Promise<void> {
        if ( !( settings.lock ) ) {
            const validator = new RegExp( "^(mongodb:(?:\\/{2})?)((\\w+?):(\\w+?)@|:?@?)(\\S+?):(\\d+)(\\/(\\S+?))?(\\?replicaSet=(\\S+?))?$", "gm" );

            const options: import("mongodb").MongoClientOptions = {
                auth: {
                    username: ( process.env[ "DOCUMENTDB_ENABLE_AUTH" ] === "true" ) ? process.env[ "DOCUMENTDB_USERNAME" ] : undefined,
                    password: ( process.env[ "DOCUMENTDB_ENABLE_AUTH" ] === "true" ) ? process.env[ "DOCUMENTDB_PASSWORD" ] : undefined
                },
                connectTimeoutMS: 5000,
                directConnection: true,
                appName: "Application-Name",
                authMechanism: "DEFAULT",
                tlsCAFile: ( process.env[ "DOCUMENTDB_ENABLE_TLS" ] === "true" ) ? Path.join( __dirname, "us-east-2-bundle.pem" ) : undefined,
                tls: ( process.env[ "DOCUMENTDB_ENABLE_TLS" ] === "true" ),
                tlsAllowInvalidHostnames: true,
                tlsAllowInvalidCertificates: true,
                retryWrites: false
            } as const;

            settings.options = options;

            // validator.test( (URI) ? URI : "" ) || ( () => {
            //     console.log( "Error - Invalid URI" );
            //     process.exit( 1 );
            // } )();
        }

        async function Handler(hostname?: string): Promise<import("mongodb").MongoClient | null> {
            const client: import("mongodb").MongoClient | null = await new Promise( async (resolve) => {
                const Client = await import("mongodb").then( (Module) => Module.MongoClient );
                Client.connect( ( hostname ) ? hostname : process.env[ "MONGO_URI" ]!, settings.options!, (exception, connection) => {
                    if ( exception ) throw exception;

                    settings.client = connection;

                    resolve( connection ?? null );
                } );

                return Client;
            } );

            ( client ) && Reflect.set( settings, "lock", true );

            return client;
        }

        ( Mongoose.connection ) || await Handler();

        void ( settings?.lock ) ? settings?.client : await Handler();
    };

    void ( async () => Handler() );
}

export default Context.Handler();
