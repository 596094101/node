import * as Koa from 'koa';
import { get, post, params, body } from '../utils/router-decors';

const users = [
    {
        name: 'zcg',
        age: 20
    },
    {
        name: 'tom',
        age: 33
    }
];

export default class User {
    @get('/users/:age')
    @params({
        age: {type: 'int', require: true, max: 200, convertType: 'int'}
    })
    public list(ctx: Koa.Context) {
        ctx.body = {ok:1, data: users, message: 'success'}
    }

    @post('/users')
    @body({
        name: {type: 'string', require: true},
        age: {type: 'int', require: true}
    })
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body);
        ctx.body = {ok:1, message: "success"}
    }
}