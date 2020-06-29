import * as http from '../../utils/service.js'

const diaryAdd = (data) =>{
	return new Promise((resolve,reject)=>{
		http.post('diaryAdd',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
const getDetail = (data) =>{
	return new Promise((resolve,reject)=>{
		http.get('getDetail',data).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

export{
	diaryAdd,
	getDetail
}