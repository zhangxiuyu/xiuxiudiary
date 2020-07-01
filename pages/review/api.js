import * as http from '../../utils/service.js'

// 添加评论
const reviewAdd = (data) =>{
	return new Promise((resolve,reject)=>{
		http.post('reviewAdd',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}


export{
	reviewAdd
}