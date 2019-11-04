const serve = require('koa-static');
const Koa = require('koa');
const path = require('path');

const app = new Koa();

app.use(serve(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}`));