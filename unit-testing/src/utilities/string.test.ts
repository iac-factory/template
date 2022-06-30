import { initialize } from ".";

describe( "C-String-Module", () => {
    initialize();

    it( "Export(s)", async () => {
        expect.assertions( 1 );

        const { Strings } = await import(".");

        const snapshot = Strings;

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { Strings }
            }
        };

        expect.setState( state );

        expect(snapshot).toMatchSnapshot();
    } );
} );
