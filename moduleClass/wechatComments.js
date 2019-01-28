const schedule = require('node-schedule');
let wechatMsg = require('../controller/wechatMsg')

class comments {

    async loginMsg(ToUserName,bot) {
        let loginMsg = `hello，大家好，我是DaWei，我会每天定时推送，舞阳，郑州，北京的天气（陆续功能后续会持续开发）春节期间回复短信，我还会给你推送春节祝福短信哟 `
        // loginMsg = artifact.pigNote()
        bot.sendMsg(loginMsg, ToUserName)
            .catch(err => {
                bot.emit('error', err)
            })
    }
    /**
     * msg:天气预报
     * @param  string { ToUserName } 你要发送给谁
     */
    async forecast(ToUserName,bot) {
        schedule.scheduleJob('0 0 7 * * *', async () => {
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
    async msgSchdule(ToUserName,bot) {
        schedule.scheduleJob('8 8 8 4-10 * *', async () => {
            let loginMsg = this.pigNote()
            bot.sendMsg(loginMsg, ToUserName)
                .catch(err => {
                    bot.emit('error', err)
                })
        })
    }
    pigNote() {
        let msgPig = [
            '猪年的歌声飘荡着团圆的喜气，猪年的烛光摇曳着快乐的福气，猪年的道路绵延着不竭的财气，猪年的灯笼照耀着万千的瑞气。猪年到了，愿你一年到头都有好运气！',
            '一声问候，打开新年气象；一杯美酒，斟满富贵美满；一束鲜花，绽放温馨美丽；一句快乐，带来无限欢笑；一道祝福，情谊就在其中。新春佳节到，祝您万事如意，喜乐安康！',
            '新的一年开始，祝您好事连连，心情四季如春，生活色彩缤纷，偶尔发点小财，烦恼抛到云外！请接受我最衷心的祝愿，新春快乐',
            '新年到了，迎来新的生活，换上新的心情，踏上新的旅程，开启新的希望，承载新的梦想，收获新的成功，享受新的幸福。衷心祝你新年愉快，身体康健，心想事成，万事如意！',
            '美好的时光，在新春的阳光下，更显灿烂多彩。2019年，是人人期盼的猪年，胖胖的小猪，带给你新年的气息，带给你非凡的运气。一起来祝福春节，一起来迎接新年吧',
            '播下一份祝福，让猪年快乐无数；传递一丝牵挂，让猪年灿烂开花；携带一缕春风，让猪年美梦成真；放飞一片希望，让猪年神采飞扬。猪年到了，愿你心想事成！',
            '新年，代表着你去年的愁烦都要完蛋；新年，表达着你的快乐将会肆无忌惮；喜悦，意味着你的未来将有我作伴；问候，融入着友谊的温馨相伴；祝福，送给你我最亲爱的朋友，祝你新年快乐，幸福美满！',
            '愿美丽陪你散步，愿健康陪你用餐，愿幸福陪你休息，愿快乐陪你聊天，愿平安陪你工作，愿开心陪你休闲。愿我的祝福陪你迎接新的一年，预祝新年快乐！',
            '猪年要来到，新春祝福提前到。祝你有人缘，事业顺利不心烦；祝你有情缘，爱情甜蜜心也甜；祝你有财源，腰包鼓鼓金钱花不完。恭祝您猪年大吉大利，顺顺利利。',
            '新年到了，祝你在新的一年里：春季像花一样漂亮，夏季像水一样清凉，秋季像果实一样成熟，冬季像火炉一样温暖。二十四节气，节节欢喜；一到十二月份，月月平安。',
            '好风好月好心情，好吃好喝好开心，好梦好运好热闹，好人好家好康宁，新年到了，把十二个好送给你，祝你一生好好，全家好好，猪年新春快乐！',
            '猪年到，请遵守四项基本原则：将财神看守到底，将幸福紧握到底，将好运怀抱到底，将爱情进行到底！请严格遵守，直至革命胜利！祝您新春快乐，万事大吉！',
            '愿快乐挥之不去，让机遇只争朝夕，愿身体健康如一，让好运春风化雨，愿幸福如期而至，让情谊日积月累，愿片言表我心语，愿春节你阖家幸福，事事称意！',
            '新年到，鸿运照，烦恼的事儿往边靠，爱情滋润没烦恼，钞票一个劲儿往家跑；愿你出门遇贵人，在家听喜报，年年有此时，岁岁有今朝，祝您一年更比一年好！春节快乐，喜上眉梢！',
            '为梦想加油，让猪年激情四射；为快乐加油，让猪年写满欢畅；为幸福守候，让猪年温馨不断；为朋友祝福，让猪年红红火火。猪年到了，愿你的生活灿烂美好。',
            '猪年到，齐欢笑，祝福朋友有妙招：小眼一眯有运道，双耳竖起招财宝，胡子撇撇福气到，三瓣豁嘴乐逍遥，蹦蹦跳跳没烦恼。小猪年，我来给你拜年了！'
        ]
        let msgKey = Math.floor(Math.random() * msgPig.length - 1);
        let msg = msgPig[msgKey]
        return msg
    }
}
let artifact = new comments()

module.exports = artifact