import { initialize } from ".";

describe( "Directory-Reader-Module", () => {
    initialize();

    it( "Export(s)", async () => {
        expect.assertions( 1 );

        const { Reader } = await import(".");

        const snapshot = Reader;

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { Reader }
            }
        };

        expect.setState( state );

        expect(snapshot).toMatchSnapshot();
    } );
} );
