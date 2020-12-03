import Immutable from 'seamless-immutable'
import store from '../store/index.mjs'

export const getall = (database, query) => {
    return new Promise((resolve, reject) => {
            return store.getData(state => {
                let data = state[database]
                resolve({
                    code: 200,
                    success: true,
                    message: "ok",
                    data
                })
            })
        })
        .catch(error => {
            return {
                code: error.code || 500,
                message: error.message || error || '未知错误',
                success: false,
                data: null
            }
        });
}

export const get = (database, query) => {
    return new Promise((resolve, reject) => {
            return store.getData(state => {
                let data = state[database] || []
                let pageNo = query.pageNo || 1
                pageNo = pageNo <= 0 ? 1 : pageNo
                let pageSize = query.pageSize || 10
                delete query.pageNo
                delete query.pageSize
                delete query.timestamp
                delete query.owerId
                delete query.enterPriseId
                for (const key in query) {
                    if (query[key]) {
                        data = data.filter(d => {
                            return d[key] == query[key]
                        })
                    }
                }
                // data = data.sort((a, b) => {
                //     return a.id > b.id
                // })
                let total = data.length
                data = data.slice((pageNo - 1) * pageSize, pageNo * pageSize)
                resolve({
                    code: 200,
                    success: true,
                    message: "ok",
                    data: {
                        list: data,
                        total,
                        pageNo: parseInt(pageNo),
                        pageSize: parseInt(pageSize)
                    }
                })
            })
        })
        .catch(error => {
            return {
                code: error.code || 500,
                message: error.message || error || '未知错误',
                success: false,
                data: null
            }
        });
}

export const add = (database, data) => {
    return new Promise((resolve, reject) => {
            store.callback(state => {
                let databases = state[database] || []
                let lastData = databases[databases.length - 1]
                let id = 1
                if (lastData) {
                    id = lastData.id + 1
                }
                data.id = id
                data.timestamp = Date.now()
                let d = Immutable(databases).concat([data])

                resolve({
                    code: 200,
                    success: true,
                    msg: "ok",
                    data
                })
                return state.set(database, d)
            })
        })
        .catch(error => {
            return {
                code: error.code || 500,
                message: error.message || error || '未知错误',
                success: false,
                data: null
            }
        });
}

export const getOne = (database, id) => {
    return new Promise((resolve, reject) => {
            store.getData(state => {
                let databases = state[database] || []
                let data = databases.find(d => {
                    return d.id == id
                })
                if (!data) {
                    resolve({
                        code: 404,
                        success: false,
                        message: "404，数据不存在",
                    })
                }
                resolve({
                    code: 200,
                    success: true,
                    message: "ok",
                    data
                })
            })
        })
        .catch(error => {
            return {
                code: error.code || 500,
                message: error.message || error || '未知错误',
                success: false,
                data: null
            }
        });
}

export const update = (database, data) => {
    return new Promise((resolve, reject) => {
            let { id } = data
            store.callback(state => {
                let index = state[database].findIndex(d => {
                    return d.id == id
                })
                let old = state.getIn([database, index])
                const ret = state.setIn([database, index], old.merge(data))
                resolve({
                    code: 200,
                    success: true,
                    msg: "ok",
                    data: data
                })
                return ret
            })
        })
        .catch(error => {
            return {
                code: error.code || 500,
                message: error.message || error || '未知错误',
                success: false,
                data: null
            }
        });
}

export const del = (database, ids) => {
    return new Promise((resolve, reject) => {
            store.callback(state => {
                let d = state[database].filter(d => {
                    return !ids.includes(d.id)
                    //  d.id != id
                })
                resolve({
                    code: 200,
                    success: true,
                    msg: "ok",
                    data: null
                })
                return state.set(database, d)
            })
        })
        .catch(error => {
            return {
                code: error.code || 500,
                message: error.message || error || '未知错误',
                success: false,
                data: null
            }
        });
}