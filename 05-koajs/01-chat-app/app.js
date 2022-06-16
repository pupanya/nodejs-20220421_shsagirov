const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const chats = [];

router.get('/subscribe', async (ctx, next) => {
  const message = new Promise((resolve) => {
    chats.push(resolve);
  });
  message.then((result) => {
    ctx.body = result;
  });
  await message;
});

router.post('/publish', async (ctx, next) => {
  if (ctx.request.body.message === undefined || ctx.request.body.message.length < 1) {
    return next();
  }

  const message = ctx.request.body.message;
  for (const chat of chats) {
    chat(message);
  }
});

app.use(router.routes());

module.exports = app;
