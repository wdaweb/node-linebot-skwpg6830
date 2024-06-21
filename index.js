import 'dotenv/config' // 引用 dotenv 套件
import linebot from 'linebot' // 引用 linebot 套件
import axios from 'axios' // 引用 axios 套件
import abc456 from './commands/456.js'

// 設定環境變數
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async (event) => {
  console.log(event)
  if (event.message.type === 'text') {
    await abc456(event)
  } else {
    // 回覆未知命令
    await event.reply({ type: 'text', text: 'りしれ供三小' })
  }
}
)

// 建立網頁伺服器，去監聽指定路徑進來的請求， process.env.PORT 如果環境變數有 PORT 就使用這個，沒有就使用 3000
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
