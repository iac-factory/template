import { initialize } from ".";

describe( "ECMA", () => {
    initialize();

    it( "Import", async () => {
        expect.assertions(1);

        const main = await import("..");
        const snapshot = JSON.stringify(main, null, 4);
        const result = "Successful";

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { result, snapshot }
            }
        };

        expect.setState( state );

        expect(snapshot).toMatchSnapshot();
    } );
});
