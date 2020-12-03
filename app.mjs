import Koa from 'koa'
import body from 'koa-better-body'
import proxy from 'koa-proxies'
import dayjs from 'dayjs'
import router from './router.mjs'

const app = new Koa();

// Object.assign(global, {
//     store
// })

//解析请求体
app.use(body({
    multipart: true
}));

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
    /**
     * 设置可跨域请求
     * 设置缓存（不缓存）
     */
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "*");
    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // ctx.set("Cache-Control", "no-cache")
    ctx.set("Cache-Control", "max-age=1")
    ctx.set("Pragma", "no-cache");
    if (ctx.method == "OPTIONS") {
        ctx.status = 204
    }
    await next();
});

app.use(router.middleware())

app.use(proxy('/octocat', {
    target: 'https://api.github.com/users',
    changeOrigin: true,
    // agent: new httpsProxyAgent('http://1.2.3.4:88'), // if you need or just delete this line
    rewrite: path => {
        let r = path.replace(/^\/octocat(\/|\/\w+)?$/, '/vagusx')
        console.log(r)
        return r
    },
    events: {
        proxyRes: (proxyRes, req, res) => {
            console.log(proxyRes.res.body)
        }
    },
    // logs: true  
    logs: (ctx, target) => {
        // new Date().toISOString()
        // console.clear()
        console.log('%s - %s %s proxy to -> %s', dayjs().format("YYYY-MM-DD HH:ss:mm"), ctx.req.method, ctx.req.oldPath, new URL(ctx.req.url, target))
    }
}))

app.listen(3000, () => {
    console.clear()
    console.log('[demo] server is starting at port 3000');
});

// import sql from 'sqlite3'

// const sqlite3 = sql.verbose();
// const db = new sqlite3.Database(':memory:');
// db.serialize(function () {
//     db.run("CREATE TABLE lorem (id INT)");
//     let stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     db.run("INSERT INTO lorem VALUES (1,123)");
//     // for (let i = 0; i < 10; i++) {
//     //     stmt.run("Ipsum " + i);
//     // }
//     // stmt.finalize();
//     // db.each("SELECT * FROM lorem", function (err, row) {
//     //     console.log(err);
//     //     console.log(row);
//     // });
// });

// db.close();