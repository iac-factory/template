import { initialize } from ".";

describe( "Subprocess", () => {
    initialize();

    it( "Spawn Class Usage", async () => {
        expect.assertions( 2 );

        const { Spawn } = await import("..");

        const result = await new Spawn( {
            application: "echo", parameters: [
                "Unit Testing ..."
            ], prefix: "Class"
        } );

        const snapshot = JSON.stringify(result, null, 4);

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { result, snapshot }
            }
        };

        expect.setState( state );

        expect( result ).toBeTruthy();
        expect(snapshot).toMatchSnapshot();
    } );

    it( "Spawn Function Usage", async () => {
        expect.assertions( 2 );

        const { Spawn } = await import("..");

        const result = await Spawn( {
            application: "echo", parameters: [
                "Unit Testing ..."
            ], prefix: "Callable"
        } );

        const snapshot = JSON.stringify(result, null, 4);

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { result, snapshot }
            }
        };

        expect.setState( state );

        expect( result ).toBeTruthy();
        expect(snapshot).toMatchSnapshot();
    } );

    it( "Spawn Class Output", async () => {
        expect.assertions( 2 );

        const { Spawn } = await import("..");

        const result = await new Spawn( {
            application: "echo", parameters: [
                "Unit Testing ..."
            ], prefix: "Class"
        } );

        const snapshot = JSON.stringify(result, null, 4);

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { result, snapshot }
            }
        };

        expect.setState( state );

        expect( result ).toEqual(["Unit Testing ..."]);
        expect(snapshot).toMatchSnapshot();
    } );

    it( "Spawn Function Output", async () => {
        expect.assertions( 2 );

        const { Spawn } = await import("..");

        const result = await Spawn( {
            application: "echo", parameters: [
                "Unit Testing ..."
            ], prefix: "Callable"
        } );

        const snapshot = JSON.stringify(result, null, 4);

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { result, snapshot }
            }
        };

        expect.setState( state );

        expect( result ).toEqual(["Unit Testing ..."]);
        expect(snapshot).toMatchSnapshot();
    } );
} );
