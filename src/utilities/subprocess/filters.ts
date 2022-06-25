export const Filters = {
    empty: function (input: Buffer | string[]) {
        input = input.toString( "utf-8" ).trim().split( "\n" );
        input = input.filter( (value, index, array) => {
            return !( value.trim() === "" && ( array[ index + 1 ]?.trim() === "" || !!( array[ index + 1 ] ) ) );
        } );

        return input;
    }
};

export default Filters;
