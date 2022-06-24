import Utility from "util";

export module C {
    export const printf = (options: Options, format: string, ... parameters: (object | string | number | boolean | null | Date | Symbol | RegExp | BigInt)[]) => {
        process.stdout.write( Utility.formatWithOptions( options, format, ... parameters ) );
    }

    export const format = (format: string, ... parameters: (object | string | number | boolean | null | Date | Symbol | RegExp | BigInt)[]) => {
        return Utility.format(format, ... parameters);
    }

    export const strip = Utility.stripVTControlCharacters;

    export const { inspect } = Utility;

    export type Options = Utility.InspectOptions;
    export type Style = "special" | "number" | "bigint" | "boolean" | "undefined" | "null" | "string" | "symbol" | "date" | "regexp" | "module";
}

export default C;
