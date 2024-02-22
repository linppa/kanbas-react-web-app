function add(a: number, b: number) {
    return a + b;
}

const twoPlusFour = add(2, 4);
console.log(twoPlusFour);

function add_component() {
    return (
        <>
            <h2>Functions</h2>
            <h3>Legacy ES5 functions</h3>
            twoPlusFour = {twoPlusFour}
            <br />
            add(2, 4) = {add(2, 4)}
            <br />
        </>
    );
}

add_component();

export default add_component;
