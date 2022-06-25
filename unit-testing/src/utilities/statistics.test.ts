import { initialize } from ".";

describe( "Statistics-Module", () => {
    initialize();

    it( "Export(s)", async () => {
        expect.assertions( 1 );

        const { Statistics } = await import(".");

        const snapshot = Statistics;

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { Statistics }
            }
        };

        expect.setState( state );

        expect(snapshot).toMatchSnapshot();
    } );
} );
