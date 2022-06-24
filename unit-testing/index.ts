export * from "..";

/***
 * Debugging Hook
 * ---
 *
 * Unit-Test Closure State
 *
 * @return {any | void}
 */
export const closure = () => afterEach( () => {
    const state: import("Unit-Testing").State = expect.getState();
    console.debug( "[Debug] [Unit-Testing] [State]", {
        Test: state.currentTestName,
        Path: state.testPath,
        Data: state.data
    } );
} );

/***
 * Initialize
 * ---
 *
 * Update Jest Global Timeout(s)
 *
 * <br/>
 *
 * @example
 * initialize() && void closure();
 */
export const initialize = () => {
    jest.setTimeout( 10 * 1000 );

    void closure();

    /*** Required for conditional call(s) */
    return true;
};

export default initialize;
