const Lab5 = (app) => {
    // create route to welcome users to assignment 5
    app.get('/a5/welcome', (req, res) => {
        res.send('Welcome to Assignment 5');
    });
};
export default Lab5;