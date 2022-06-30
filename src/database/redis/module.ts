import * as Redis from "redis";

/*** https://docs.redis.com/latest/rs/references/client_references/client_nodejs/ */
export module Cache {
    /***
     * @syntax redis[s]://[[username][:password]@][host][:port][/db-number]
     */
    export interface Partial {
        protocol?: "redis" | "rediss",
        secure?: boolean,
        username?: string,
        password?: string,
        hostname: string,
        port?: number,
        "db-number"?: number
    }

    export const hash = async () => {
        const client = Redis.createClient({
            url: "redis://localhost:6379"
        });

        await client.connect();

        client.on( "error", ( exception ) => console.log( "Redis Client Error" + ":", exception ) );

        await client.json.del("Test-Secret-Insertion");
        const insertion = await client.json.set("Test-Secret-Insertion", "$", {
            username: "Segmentational",
            secret: {
                application: "Azure",
                token: null,
                password: "[...]",
                expiration: 0
            }
        });

        const successful = (insertion === "OK");

        (successful) && await client.json["NUMINCRBY"]("Test-Secret-Insertion", ".secret.expiration", 1e3 * 60 * 60 * 24);

        return [successful, await client.json.get("Test-Secret-Insertion")];
    }

    export const set = async (parameters: {key: string, value: string}) => {
        const { key, value } = parameters;
        const client = Redis.createClient({
            url: "redis://localhost:6379"
        });

        await client.connect();

        client.on( "error", ( exception ) => console.log( "Redis Client Error" + ":", exception ) );

        await client.set(key, value);

        const scan: string[] = [];
        for await (const key of client.scanIterator()) {
            const value = await client.get(key);

            (value) && scan.push(value);
        }

        return scan;
    }
}

export default Cache;
