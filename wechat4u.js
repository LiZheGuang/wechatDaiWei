
const Wechat = require('wechat4u')
const qrcode = require('qrcode-terminal')
const fs = require('fs')
const schedule = require('node-schedule');

const request = require('request')
let wechatMsg = require('./controller/wechatMsg')
let wechatData = {
    UserName: ""
}
let bot
module.exports.test = async () => {
    /**
     * 尝试获取本地登录数据，免扫码
     * 这里演示从本地文件中获取数据
     */
    try {
        bot = new Wechat(require('./sync-data.json'))
    } catch (e) {
        bot = new Wechat()
    }
    /**
     * 启动机器人
     */
    if (bot.PROP.uin) {
        // 存在登录数据时，可以随时调用restart进行重启
        bot.restart()
    } else {
        bot.start()
    }
    /**
     * uuid事件，参数为uuid，根据uuid生成二维码
     */
    bot.on('uuid', uuid => {
        qrcode.generate('https://login.weixin.qq.com/l/' + uuid, {
            small: true
        })
        console.log('二维码链接：', 'https://login.weixin.qq.com/qrcode/' + uuid)
    })

    /**
     * 登录成功事件
     */
    bot.on('login', () => {
        console.log('登录成功')
        // 保存数据，将数据序列化之后保存到任意位置
        fs.writeFileSync('./sync-data.json', JSON.stringify(bot.botData))
        console.log('要延时发送消息')
        let ToUserName = wechatData.UserName
        artifact.loginMsg(ToUserName)
        artifact.forecast(ToUserName)
    })

    /**
 * 联系人更新事件，参数为被更新的联系人列表
 */
    bot.on('contacts-updated', contacts => {
        // console.log(contacts)
        // console.log('联系人数量：', Object.keys(bot.contacts).length)
        contacts.map((res) => {
            if (res.NickName === '李哲广测试') {
                wechatData = res
            }
        })
        // console.log('李哲广的测试群为' + wechatData.UserName)
    })
}

class comments {
    async loginMsg(ToUserName) {
        let loginMsg = `hello，大家好，我是DaWei，我会每天定时推送，舞阳，郑州，北京的天气（陆续功能后续会持续开发） `
        bot.sendMsg(loginMsg, ToUserName)
            .catch(err => {
                bot.emit('error', err)
            })

    }
    /**
     * msg:天气预报
     * @param  string { ToUserName } 你要发送给谁
     */
    async forecast(ToUserName) {
        schedule.scheduleJob('30 7 0 0 * *', async () => {
            let cityAttr = ['舞阳县', '郑州市', '北京市']
            for (let i = 0; i < cityAttr.length; i++) {
                // console.log(i)
                console.log(cityAttr[i])
                let weatherRes = await wechatMsg.weather(cityAttr[i])
                let weather = weatherRes.weather

                console.log(weatherRes)
                let loginMsg =
                    `【当前城市：${weather.data.city}】
                                气温 ：${weather.data.now[0].now_temperature}
                                风向 : ${weather.data.now[0].now_wind_direction + weather.data.now[0].now_wind_power}
                                体感温度 : ${weather.data.now[0].now_feelst}
                                相对湿度 : ${weather.data.now[0].now_humidity}`

                bot.sendMsg(loginMsg, ToUserName)
                    .catch(err => {
                        bot.emit('error', err)
                    })
            }
        });
    }
}
let artifact = new comments()
module.exports.test()