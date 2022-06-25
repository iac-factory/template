import { initialize } from ".";

describe( "CLI-Module", () => {
    initialize();

    it( "Export(s)", async () => {
        expect.assertions( 1 );

        const { CLI } = await import(".");

        const snapshot = CLI;

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { snapshot }
            }
        };

        expect.setState( state );

        expect(snapshot).toMatchSnapshot();
    } );
} );
