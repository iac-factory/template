import { initialize } from ".";

describe( "Copy-Module", () => {
    initialize();

    it( "Export(s)", async () => {
        expect.assertions( 1 );

        const { Copy } = await import(".");

        const snapshot = Copy;

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { Copy }
            }
        };

        expect.setState( state );

        expect(snapshot).toMatchSnapshot();
    } );
} );
