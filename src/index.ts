import * as Koa from 'koa';
import * as bodify from 'koa-body';
import { load } from './utils/router-decors';
import { resolve } from 'path';

const app = new Koa();

app.use(
    bodify({
        multipart: true,
        strict: false,
    })
);

const router = load(resolve(__dirname, './routes'));

app.use(async(ctx, next) => {
    try{
        await next();
    } catch(err) {
        app.emit('error', err, this);
        const status = err.status || 500;
        const error = err.message;
        ctx.body = {
            code: status,
            error,
        }
        if (status === 422) {
            ctx.body.detail = err.message;
        }
    }
})

app.use(router.routes());

app.listen(3000, () => {
    console.log('服务器启动成功');
})