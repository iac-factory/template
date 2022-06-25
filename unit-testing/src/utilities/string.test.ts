import { initialize } from ".";

describe( "C-String-Module", () => {
    initialize();

    it( "Export(s)", async () => {
        expect.assertions( 1 );

        const { C } = await import(".");

        const snapshot = C;

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { C }
            }
        };

        expect.setState( state );

        expect(snapshot).toMatchSnapshot();
    } );
} );
