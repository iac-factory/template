import { initialize } from ".";

describe( "CJS", () => {
    initialize();

    it( "Import", async () => {
        expect.assertions(1);

        const main = require( ".." );
        const snapshot = JSON.stringify( main, null, 4 );
        const result = "Successful";

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { result, snapshot }
            }
        };

        expect.setState( state );

        expect(snapshot).toMatchSnapshot();
    } );
} );
