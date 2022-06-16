const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const chat = [];

router.get('/subscribe', async (ctx, next) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      if (chat.length > 0) {
        ctx.body = chat.join('\r\n');
        chat.length = 0;
      }

      resolve();
    }, 500);
  });
});

router.post('/publish', async (ctx, next) => {
  chat.push(ctx.request.body.message);
});

app.use(router.routes());

module.exports = app;
