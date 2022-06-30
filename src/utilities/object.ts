export module Objects {
    /***
     * Like `Object.assign`, but ignores `undefined` properties
     *
     * @param {T} initial
     * @param {T} sources
     * @return {T}
     */
    export function assign<T extends object>(initial: T, ... sources: Array<T>): T {
        for ( const source of sources ) {
            for ( const key of Object.keys( source ) ) {
                const value = ( source as any )[ key ];
                if ( value !== undefined ) ( initial as any )[ key ] = value;
            }
        }
        return initial;
    }

    /***
     * Like `Object.assign`, but ignores both `undefined` and `null` properties
     *
     * @param {T} initial
     * @param {T} sources
     * @return {T}
     */
    export function strict<T extends object>(initial: T, ... sources: Array<T>): T {
        for ( const source of sources ) {
            for ( const key of Object.keys( source ) ) {
                const value = ( source as any )[ key ];
                if ( value !== undefined && value !== null ) ( initial as any )[ key ] = value;
            }
        }
        return initial;
    }
}