import Mock from 'mockjs'
import Immutable from 'seamless-immutable'
import createStore from '../utils/createStore.mjs'

Mock.Random.extend({
    phone: function () {
        let phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
})

const sites = [{ "name": "巴东财政", "pid": 31, "id": 39, "shortName": "巴东财政", status: 1 },
    { "name": "测试站点", "pid": "", "id": 38, "shortName": "测试站点", status: 2 },
    { "name": "来凤统计", "pid": 56, "id": 239, "shortName": "来凤统计", status: 3, reason: "太丑了你" },
    { "name": "恩施市自来水有限责任公司", "pid": 1, "id": 37, "shortName": "恩施自来水" },
    { "name": "恩施州高新投资开发有限责任公司", "pid": 1, "id": 36, "shortName": "州高新投" },
    { "name": "云上鹤峰", "pid": "", "id": 35, "shortName": "云上鹤峰" },
    { "name": "来凤新闻网(弃用)", "pid": 1, "id": 78, "shortName": "来凤新闻网" },
    { "name": "恩施市总工会", "pid": 1, "id": 77, "shortName": "恩施总工会" },
    { "name": "鹤峰县宝通旅游开发有限公司", "pid": 35, "id": 33, "shortName": "宝通旅游" },
    { "name": "巴东县清太坪镇", "pid": 31, "id": 158, "shortName": "巴东县清太坪镇" },
    { "name": "恩施市政协", "pid": 1, "id": 76, "shortName": "恩施市政协" },
    { "name": "巴东网络电视", "pid": 31, "id": 32, "shortName": "巴东网络电视" },
    { "name": "巴东县野三关镇", "pid": 31, "id": 157, "shortName": "巴东县野三关镇" },
    { "name": "长江巴东网", "pid": 1, "id": 31, "shortName": "长江巴东网" }
]

export const initValue = Mock.mock({
    tongji: {
        article: 353,
        tg: 125,
        ds: 15,
        zl: 115,
        qy: 5
    },
    sites: sites,
    site: {
        "roleIds": [34, 77, 36, 135, 255, 76, 133, 75, 128, 91, 125],
        "siteId": 38,
        "siteName": "测试站点",
        "perms": "workflow.add,apppush,interface.template.uploads,advertise.device.bind,dashboard.home,depart.update,interface.resource,member.roles.update,member.department.update,channel,apppush.list,advertise.agency.add,channel.delete,content.add,interface.static,advertise.pxmng,editing.column.delete,interface.logs,advertise.px.edit,advertise.statismng,member.users.list,subject.add,interface.template.list,contribute.update,content.list,advertise.ad.add,advertise.admng,1,advertise.device.add,contribute.list,appmanage.category.list,interface.template.delete,workflow.list,contentlist.update,comment.check,interface.template,member.department.list,interface.resource.delete,workflow.delete,member.roles.list,advertise.ad.detail,member.users.update,workflow.update,contentlist,member.users.delete,comment.update,member,advertise.statis.list,contribute.entity,interface.resource.list,advertise.agency.edit,advertise.device.delete,member.users,apppush.add,appmanage,editing.column.add,interface.template.add,interface.template.update,advertise.ad.list,subject.list,channel.add,contentlist.add,comment.recommend,interface.resource.update,report,content.delete,comment.list,advertise.device.list,contentlist.delete,statistics,editing.column.update,member.department,member.roles.delete,advertise.ad.edit,appmanage.category.update,subject,depart.delete,interface.resource.uploads,member.department.delete,advertise.ad.push,content.update,cloud,channel.update,advertise.px.delete,depart,depart.list,interface.resource.add,advertise.agency.delete,contributesystem,workflow,interface.resource.rename,vmsDataMng.video,interface.template.createdir,editing.entity,statis,advertise.px.list,contentlist.list,interface.template.rename,vmsDataMng,vmsDataMng.image,member.roles,subject.update,contribute,member.department.add,interface,content,advertise.agency.list,advertise.device.edit,depart.add,advertise.devicemng,subject.delete,channel.list,comment.delete,appmanage.category,contribute.delete,advertise.px.add,statis.record,vmsDataMng.audio,editing,advertise.agencymng,contribute.add,advertise.ad.delete,member.roles.add,comment,comment.reply,interface.resource.createdir,member.users.add,advertise,",
        "sites": sites,
        "isMasterSite": false,
        "gaFlag": true,
        "config": { "maxFileSize": 300, "maxMediaSize": 1540 },
        "userId": 77,
        "username": "18672035432",
        "realname": "田恩仲"
    },
    'roles|10-30': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'description': '@cparagraph',
        "name": "@cword(2, 4)",
    }],
    'users|10-30': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'phone': '@phone',
        "username": "@cname",
        "tenantId": "@integer(15,16)",
        "dept_id": "@integer(1,10)",
    }],
    'column|3-6': [{
        'id|+1': 1,
        'name': "@cword(2, 4)",
        "remark": "@ctitle"
    }],
    "article|1-2": [{
        'id|+1': 1,
        "title": "@ctitle",
        "mode": "@integer(1,4)",
        "authorName": 0,
        "columnId": "@integer(1,6)",
        "content": "@cparagraph",
        "createDate": "2020-11-10T06:24:37.297Z",
        "deleted": "@boolean",
        "internalAudit": "@boolean",
        "lastUpdateDate": "2020-11-10T06:24:37.297Z",
        "owerId": 0,
        "thumbnail": "@image",
        "type": 0,
        "userId": 0
    }],
    "callforpapers|30-100": [{
        'id|+1': 1,
        "title": "@ctitle",
        "mode": "@integer(1,4)",
        "authorName": 0,
        "columnId": "@integer(1,6)",
        "content": "@cparagraph",
        "createDate": "2020-11-10T06:24:37.297Z",
        "deleted": "@boolean",
        "internalAudit": "@boolean",
        "lastUpdateDate": "2020-11-10T06:24:37.297Z",
        "owerId": 0,
        "thumbnail": "@image",
        "type": "@integer(0,1)",
    }],
    "material|100": [{
        'id|+1': 1,
        "name": "@ctitle",
        "type": "@integer(1,4)",
        "thumbnail": "@image",
    }],
    systems: [{
        sysName: "内容管理2",
        sysId: 1
    }, {
        sysName: "投稿系统",
        sysId: 2
    }]
})

export const store2 = Immutable(initValue)

const store = createStore()(initValue)

export default store