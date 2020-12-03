import Router from 'koa-router'
import { getall, get, add, getOne, update, del } from './utils/request.mjs'

let router = Router()

router.get('/mock/:database/getall', async (ctx, next) => {
    let database = ctx.params.database
    let data = await getall(database)
    ctx.body = data
})

router.get('/mock/:database/get', async (ctx, next) => {
    let database = ctx.params.database
    let query = ctx.request.query || {}
    let data = await get(database, query)
    ctx.body = data
})

router.post('/mock/:database/add', async (ctx, next) => {
    let database = ctx.params.database
    let body = ctx.request.fields || ctx.body || {}
    let data = await add(database, body)
    ctx.body = data
})

router.get('/mock/:database/getOne', async (ctx, next) => {
    let database = ctx.params.database
    let id = ctx.request.query.id
    let data = await getOne(database, id)
    ctx.body = data
})

router.post('/mock/:database/update', async (ctx, next) => {
    let database = ctx.params.database
    let body = ctx.request.fields || ctx.body || {}
    let data = await update(database, body)
    ctx.body = data
})

router.post('/mock/:database/del', async (ctx, next) => {
    let database = ctx.params.database
    let body = ctx.request.fields || ctx.body || {}
    let ids = { body }
    let data = await del(database, ids)
    ctx.body = data
})

export default router