import * as http from '../../utils/service.js'

// 评论列表
const reviewList = (data) =>{
	return new Promise((resolve,reject)=>{
		http.get('reviewList',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

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

// 点赞 取消点赞
const hit = (data) =>{
	return new Promise((resolve,reject)=>{
		http.post('hit',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}


export{
	reviewList,
	hit,
	reviewAdd
}