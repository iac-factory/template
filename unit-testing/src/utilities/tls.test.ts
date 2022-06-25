import { initialize } from ".";

describe( "TLS-Module", () => {
    initialize();

    it( "Export(s)", async () => {
        expect.assertions( 1 );

        const { TLS } = await import(".");

        const snapshot = TLS;

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { TLS }
            }
        };

        expect.setState( state );

        expect(snapshot).toMatchSnapshot();
    } );
} );
