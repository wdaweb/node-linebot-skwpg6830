import axios from 'axios'
import 'dotenv/config'
import template from '../templates/culture.js'
import fs from 'node:fs'

export default async (event) => {
  try {
    // 從使用者輸入中獲取城市名稱（假設城市名稱以文字形式提供）
    const cityName = event.message.text.trim() // 假設城市名稱以文字形式作為輸入

    console.log('正在從 API 取得資料...')
    const response = await axios.get('https://data.moa.gov.tw/Service/OpenData/FromM/RicepriceData.aspx?IsTransData=1&UnitId=266')
    const data = response.data

    // 根據指定的城市名稱尋找資料
    const exhibitions = data.find(item => item.name.trim() === cityName)

    // 檢查是否找到了城市的資料
    if (!exhibitions) {
      await event.reply('找不到相關資料') // 如果找不到對應的資料，回覆給使用者
      return
    }

    // 使用模板建立回覆的內容
    const t = template()

    // 設置模板中的城市名稱
    t.body.contents[0].text = exhibitions.name || 'N/A'

    // 設置不同種類白米的價格資訊
    t.body.contents[1].contents[0].contents[1].text = exhibitions.pt_1japt.toString() || 'N/A'
    t.body.contents[2].contents[0].contents[1].text = exhibitions.pt_1tsait.toString() || 'N/A'
    t.body.contents[3].contents[0].contents[1].text = exhibitions.pt_1sangt.toString() || 'N/A'
    t.body.contents[4].contents[0].contents[1].text = exhibitions.pt_1glutrt.toString() || 'N/A'
    t.body.contents[5].contents[0].contents[1].text = exhibitions.pt_1glutlt.toString() || 'N/A'

    console.log('回覆內容: ', t)

    // 回覆使用 flex 形式的結果
    const result = await event.reply({
      type: 'flex',
      altText: '查詢結果',
      contents: t
    })

    console.log('回覆結果:', result)
    // fs.writeFileSync('./aaaa.json', JSON.stringify(t, null, 2));
  } catch (error) {
    console.error('發生錯誤:', error)
    await event.reply('發生錯誤') // 如果出現錯誤，回覆錯誤訊息給使用者
  }
}
