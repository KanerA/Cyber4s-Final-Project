const app = require('./app');
const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`app is listening on port - ${PORT}`);
    console.log(`work environment - ${env}`);
});