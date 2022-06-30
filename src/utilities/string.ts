import Utility from "util";

export module Strings {
    export const printf = (options: Options, format: string, ... parameters: (object | string | number | boolean | null | Date | Symbol | RegExp | BigInt)[]) => {
        process.stdout.write( Utility.formatWithOptions( options, format, ... parameters ) );
    }

    export const format = (format: string, ... parameters: (object | string | number | boolean | null | Date | Symbol | RegExp | BigInt)[]) => {
        return Utility.format(format, ... parameters);
    }

    export const strip = Utility.stripVTControlCharacters;

    export const { inspect } = Utility;

    /**
     * Split a string array of values
     * and remove empty strings from the resulting array.
     * @internal
     */
    export function split(value: string | undefined) {
        return typeof value === 'string'
            ? value.split(/ *, */g).filter((v) => v !== '')
            : undefined;
    }

    /**
     * Parse a string as JSON.
     * @internal
     */
    export function parse(value: string | undefined): object | undefined {
        return typeof value === 'string' ? JSON.parse(value) : undefined;
    }

    export type Options = Utility.InspectOptions;
    export type Style = "special" | "number" | "bigint" | "boolean" | "undefined" | "null" | "string" | "symbol" | "date" | "regexp" | "module";
}

export default Strings;
