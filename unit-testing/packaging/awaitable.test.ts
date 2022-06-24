import { initialize } from ".";

describe( "awaitable", () => {
    initialize();

    it( "import", async () => {
        expect.assertions(1);

        const main = import("..");
        const snapshot = JSON.stringify(main, null, 4);
        const result = "Successful";

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { result, snapshot }
            }
        };

        await expect( main ).resolves.toBeTruthy().then(() => {
            expect.setState( state );

            expect(snapshot).toMatchSnapshot();
        });
    } );
} );
