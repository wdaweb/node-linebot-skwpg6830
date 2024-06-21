import axios from 'axios'

const main = async () => {
	try {
		const response = await axios.get('https://cultureexpress.taipei/OpenData/Event/C000003')
		const data = response.data // 從回應對象提取數據

		// 過濾出類別為"展覽"的事件
		const exhibitions = data.filter((item) => item.Category === '展覽')

		// 使用 slice() 方法來取得前五筆資料
		const topFiveExhibitions = exhibitions.slice(0, 5)

		// 建構回覆訊息
		const richContents = topFiveExhibitions.map((exhibition) => [
			{ type: 'text', text: `活動名稱：${exhibition.Caption}` },
			{ type: 'text', text: `組織者：${exhibition.Company}` },
			{ type: 'text', text: `開始時間：${exhibition.StartDate}` },
			{ type: 'text', text: `結束時間：${exhibition.EndDate}` },
			{ type: 'text', text: `類別：展覽` }
		])

		console.log(richContents)
	} catch (error) {
		console.error('發生錯誤:', error)
	}
}

// main()
